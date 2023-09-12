import React from "react";
import { ReplyComment, User } from "../types";
import {
  CommentActions,
  CommentActionsTypes,
} from "../reducers/CommentReducer";
import Comment from "./Comment";
import { v4 } from "uuid";
import { timeAgo } from "../util/timeAgo";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type RepliesProps = {
  replies: ReplyComment[];
  commentId: number | string;
  currentUser: User; // Define the type of currentUser if you have one
  dispatch: React.Dispatch<CommentActions>; // Adjust the type based on your dispatch
};

const Replies: React.FC<RepliesProps> = ({
  replies,
  commentId,
  currentUser,
  dispatch,
}) => {
  const [replyListRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="flex">
      <div className="mx-4 w-[2px] flex-shrink-0 bg-light-gray desktop:mx-11"></div>
      <div
        ref={replyListRef}
        className="flex flex-1 flex-col gap-4 desktop:gap-6"
      >
        {replies.map((rep) => (
          <Comment
            onDownVote={() =>
              dispatch({
                type: CommentActionsTypes.DOWN_VOTE,
                payload: {
                  commentId: commentId,
                  replyId: rep.id,
                },
              })
            }
            onUpVote={() =>
              dispatch({
                type: CommentActionsTypes.UP_VOTE,
                payload: {
                  commentId: commentId,
                  replyId: rep.id,
                },
              })
            }
            onUpdate={(id, content) => {
              dispatch({
                type: CommentActionsTypes.EDIT_REPLY,
                payload: {
                  commentId: commentId,
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
                  commentId: commentId,
                  replyId: rep.id,
                },
              });
            }}
            onReply={(_commentId, content, replyingTo) =>
              dispatch({
                type: CommentActionsTypes.REPLY_COMMENT,
                payload: {
                  commentId: commentId,
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
  );
};

export default Replies;
