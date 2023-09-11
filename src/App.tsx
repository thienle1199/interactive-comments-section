import Comment from "./components/Comment";
import data from "../data.json";
import { Comment as CommentType, DataType, ReplyComment } from "./types";
import AddComment from "./components/AddComment";
import { useEffect, useReducer } from "react";
import { v4 } from "uuid";

enum CommentActionsTypes {
  ADD_COMMENT = "ADD_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  REPLY_COMMENT = "REPLY_COMMENT",
  DELETE_REPLY = "DELETE_REPLY",
}

type CommentState = CommentType[];

type AddCommentAction = {
  type: CommentActionsTypes.ADD_COMMENT;
  payload: CommentType;
};

type DeleteCommentAction = {
  type: CommentActionsTypes.DELETE_COMMENT;
  payload: number | string;
};

type DeleteReplyAction = {
  type: CommentActionsTypes.DELETE_REPLY;
  payload: {
    commentId: number | string;
    replyId: number | string;
  };
};

type ReplyCommentAction = {
  type: CommentActionsTypes.REPLY_COMMENT;
  payload: {
    commentId: string | number;
    replyComment: ReplyComment;
  };
};

const commentReducer = (
  state: CommentState,
  action:
    | AddCommentAction
    | DeleteCommentAction
    | ReplyCommentAction
    | DeleteReplyAction
) => {
  switch (action.type) {
    case CommentActionsTypes.ADD_COMMENT:
      return [...state, action.payload];

    case CommentActionsTypes.DELETE_COMMENT: {
      return state.filter((comment) => comment.id !== action.payload);
    }

    case CommentActionsTypes.DELETE_REPLY: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: comment.replies.filter(
              (rep) => rep.id !== action.payload.replyId
            ),
          };
        }

        return comment;
      });
    }

    case CommentActionsTypes.REPLY_COMMENT: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: [...comment.replies, action.payload.replyComment],
          };
        }
        return comment;
      });
    }
  }
};

const localStorageDataKey = "comment-data";

const createCommentReducerInitialState = (comments: CommentType[]) => {
  const localStorageData = window.localStorage.getItem(localStorageDataKey);

  if (localStorageData) {
    return JSON.parse(localStorageData);
  }

  return comments;
};

function App() {
  const { currentUser, comments } = data as DataType;
  const { image } = currentUser;
  const [state, dispatch] = useReducer(
    commentReducer,
    comments,
    createCommentReducerInitialState
  );

  useEffect(() => {
    localStorage.setItem(localStorageDataKey, JSON.stringify(state));
  }, [state]);

  return (
    <main className="font-rubik px-4 py-8 desktop:py-16 container mx-auto max-w-[1024px]">
      <div className="flex flex-col gap-4 desktop:gap-5">
        {state.map((comment) => (
          <Comment
            onDelete={(id) =>
              dispatch({
                type: CommentActionsTypes.DELETE_COMMENT,
                payload: id,
              })
            }
            onReply={(id, content) => {
              dispatch({
                type: CommentActionsTypes.REPLY_COMMENT,
                payload: {
                  commentId: id,
                  replyComment: {
                    content: content,
                    createdAt: new Date(Date.now()).toString(),
                    id: v4(),
                    replyingTo: "",
                    score: 0,
                    user: currentUser,
                  },
                },
              });
            }}
            currentUser={currentUser}
            key={comment.id}
            comment={comment}
          >
            {comment.replies.length > 0 && (
              <div className="flex">
                <div className="w-[2px] flex-shrink-0 bg-light-gray mx-4 desktop:mx-11"></div>
                <div className="flex flex-col flex-1 gap-4 desktop:gap-6">
                  {comment.replies.map((rep) => (
                    <Comment
                      currentUser={currentUser}
                      key={rep.id}
                      replyingTo={rep.replyingTo}
                      onDelete={() => {
                        dispatch({
                          type: CommentActionsTypes.DELETE_REPLY,
                          payload: {
                            commentId: comment.id,
                            replyId: rep.id,
                          },
                        });
                      }}
                      onReply={(_commentId, content) =>
                        dispatch({
                          type: CommentActionsTypes.REPLY_COMMENT,
                          payload: {
                            commentId: comment.id,
                            replyComment: {
                              content,
                              createdAt: new Date(Date.now()).toString(),
                              id: v4(),
                              replyingTo: comment.user.username,
                              score: 0,
                              user: currentUser,
                            },
                          },
                        })
                      }
                      comment={rep}
                    />
                  ))}
                </div>
              </div>
            )}
          </Comment>
        ))}
      </div>
      <AddComment
        className="mt-4 desktop:mt-5"
        currentUserAvatar={image.webp}
        onAddComment={(content) =>
          dispatch({
            payload: {
              content: content,
              createdAt: new Date(Date.now()).toString(),
              id: v4(),
              replies: [],
              score: 0,
              user: currentUser,
            },
            type: CommentActionsTypes.ADD_COMMENT,
          })
        }
      />
    </main>
  );
}
export default App;
