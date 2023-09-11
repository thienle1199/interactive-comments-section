import Comment from "./components/Comment";
import data from "../data.json";
import { Comment as CommentType, DataType, ReplyComment } from "./types";
import AddComment from "./components/AddComment";
import { useEffect, useReducer } from "react";
import { v4 } from "uuid";
import { timeAgo } from "./util/timeAgo";

enum CommentActionsTypes {
  ADD_COMMENT = "ADD_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  REPLY_COMMENT = "REPLY_COMMENT",
  DELETE_REPLY = "DELETE_REPLY",
  EDIT_COMMENT = "EDIT_COMMENT",
  EDIT_REPLY = "EDIT_REPLY",
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

type EditCommentAction = {
  type: CommentActionsTypes.EDIT_COMMENT;
  payload: {
    commentId: number | string;
    content: string;
  };
};

type EditReplyAction = {
  type: CommentActionsTypes.EDIT_REPLY;
  payload: {
    commentId: string | number;
    replyId: string | number;
    content: string;
  };
};

const commentReducer = (
  state: CommentState,
  action:
    | AddCommentAction
    | DeleteCommentAction
    | ReplyCommentAction
    | DeleteReplyAction
    | EditCommentAction
    | EditReplyAction,
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
              (rep) => rep.id !== action.payload.replyId,
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

    case CommentActionsTypes.EDIT_COMMENT: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            content: action.payload.content,
          };
        }

        return comment;
      });
    }

    case CommentActionsTypes.EDIT_REPLY: {
      console.log("action.payload", action.payload);
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: comment.replies.map((rep) => {
              if (rep.id === action.payload.replyId) {
                return {
                  ...rep,
                  content: action.payload.content,
                };
              }
              return rep;
            }),
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
    createCommentReducerInitialState,
  );

  useEffect(() => {
    localStorage.setItem(localStorageDataKey, JSON.stringify(state));
  }, [state]);

  return (
    <main className="container mx-auto max-w-[1024px] px-4 py-8 font-rubik desktop:py-16">
      <div className="flex flex-col gap-4 desktop:gap-5">
        {state.map((comment) => (
          <Comment
            onDelete={(id) =>
              dispatch({
                type: CommentActionsTypes.DELETE_COMMENT,
                payload: id,
              })
            }
            onReply={(id, content, replyingTo) => {
              dispatch({
                type: CommentActionsTypes.REPLY_COMMENT,
                payload: {
                  commentId: id,
                  replyComment: {
                    content: content,
                    createdAt: new Date(Date.now()).toString(),
                    id: v4(),
                    replyingTo: replyingTo,
                    score: 0,
                    user: currentUser,
                  },
                },
              });
            }}
            onUpdate={(id, content) => {
              dispatch({
                type: CommentActionsTypes.EDIT_COMMENT,
                payload: {
                  commentId: id,
                  content: content,
                },
              });
            }}
            currentUser={currentUser}
            key={comment.id}
            comment={{
              ...comment,
              createdAt: comment.createdAt.includes("ago")
                ? comment.createdAt
                : timeAgo(new Date(comment.createdAt)),
            }}
          >
            {comment.replies.length > 0 && (
              <div className="flex">
                <div className="mx-4 w-[2px] flex-shrink-0 bg-light-gray desktop:mx-11"></div>
                <div className="flex flex-1 flex-col gap-4 desktop:gap-6">
                  {comment.replies.map((rep) => (
                    <Comment
                      onUpdate={(id, content) => {
                        dispatch({
                          type: CommentActionsTypes.EDIT_REPLY,
                          payload: {
                            commentId: comment.id,
                            content: content,
                            replyId: id,
                          },
                        });
                      }}
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
                      onReply={(_commentId, content, replyingTo) =>
                        dispatch({
                          type: CommentActionsTypes.REPLY_COMMENT,
                          payload: {
                            commentId: comment.id,
                            replyComment: {
                              content,
                              createdAt: new Date(Date.now()).toString(),
                              id: v4(),
                              replyingTo: replyingTo,
                              score: 0,
                              user: currentUser,
                            },
                          },
                        })
                      }
                      comment={{
                        ...rep,
                        createdAt: rep.createdAt.includes("ago")
                          ? rep.createdAt
                          : timeAgo(new Date(rep.createdAt)),
                      }}
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
