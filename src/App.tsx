import Comment from "./components/Comment";
import data from "../data.json";
import { Comment as CommentType, DataType } from "./types";
import AddComment from "./components/AddComment";
import { useEffect, useReducer } from "react";
import { v4 } from "uuid";
import { timeAgo } from "./util/timeAgo";
import { CommentActionsTypes, commentReducer } from "./reducers/CommentReducer";
import Replies from "./components/Replies";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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

  const [commentListRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    localStorage.setItem(localStorageDataKey, JSON.stringify(state));
  }, [state]);

  return (
    <main className="container mx-auto max-w-[730px] px-4 py-8 font-rubik desktop:py-16">
      <div ref={commentListRef} className="flex flex-col gap-4 desktop:gap-5">
        {state
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
            <Comment
              onDownVote={() =>
                dispatch({
                  type: CommentActionsTypes.DOWN_VOTE,
                  payload: {
                    commentId: comment.id,
                  },
                })
              }
              onUpVote={() =>
                dispatch({
                  type: CommentActionsTypes.UP_VOTE,
                  payload: {
                    commentId: comment.id,
                  },
                })
              }
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
                <Replies
                  replies={comment.replies}
                  commentId={comment.id}
                  currentUser={currentUser}
                  dispatch={dispatch}
                />
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
