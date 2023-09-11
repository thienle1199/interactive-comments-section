import { ReactNode, useState } from "react";
import { BaseComment, User } from "../types";
import AddComment from "./AddComment";
import ButtonVote from "./ButtonVote";
import CommentInfo from "./CommentInfo";
import { OwnerButtonGroup } from "./OwnerButtonGroup";
import ReplyButton from "./ReplyButton";
import Modal from "./Modal";

interface CommentProps {
  comment: BaseComment;
  currentUser: User;
  replyingTo?: string;
  onDelete: (id: string | number) => void;
  onReply: (commentId: number | string, content: string) => void;
  children?: ReactNode;
}

export default function Comment({
  comment: { content, createdAt, id, score, user },
  children,
  currentUser,
  replyingTo,
  onDelete,
  onReply,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const isOwn = currentUser.username === user.username;

  return (
    <div className="transition-all flex flex-col gap-4 desktop:gap-5">
      <article className="p-6 grid grid-cols-2 desktop:grid-cols-[auto_1fr_auto] gap-4 desktop:gap-x-6 desktop:gap-y-4 rounded-lg  bg-white">
        <CommentInfo
          isOwn={isOwn}
          userAvatar={user.image.webp}
          userName={user.username}
          createdAt={createdAt}
          className="col-span-2 desktop:col-span-1"
        />
        <p className="text-body text-grayish-blue col-span-2">
          {replyingTo ? (
            <span className="text-heading-m text-moderate-blue">
              @{replyingTo}
            </span>
          ) : (
            ""
          )}{" "}
          {content}
        </p>
        <ButtonVote
          vote={score}
          className="desktop:row-start-1 desktop:col-start-1 desktop:row-span-2"
        />
        {isOwn ? (
          <OwnerButtonGroup
            onDelete={() => setModalOpen(true)}
            className="desktop:row-start-1 desktop:col-start-3 justify-self-end"
          />
        ) : (
          <ReplyButton
            onClick={() => setIsReplying(true)}
            className="desktop:row-start-1 desktop:col-start-3 justify-self-end"
          />
        )}
      </article>

      {isReplying && (
        <AddComment
          onClickOutSide={() => setIsReplying(false)}
          currentUserAvatar={currentUser.image.webp}
          onAddComment={(content) => {
            onReply(id, content);
          }}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal Title"
        onDelete={() => onDelete(id)}
      />
      {children}
    </div>
  );
}
