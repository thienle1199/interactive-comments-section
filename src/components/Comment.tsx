import { ReactNode, useRef, useState } from "react";
import { BaseComment, User } from "../types";
import AddComment from "./AddComment";
import ButtonVote from "./ButtonVote";
import CommentInfo from "./CommentInfo";
import { OwnerButtonGroup } from "./OwnerButtonGroup";
import ReplyButton from "./ReplyButton";
import Modal from "./Modal";
import TextAreaAutoHeight from "./TextAreaAutoHeight";
import useOutsideAlerter from "../hooks/useOnClickOutSide";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CommentProps {
  comment: BaseComment;
  currentUser: User;
  replyingTo?: string;
  onDelete: (id: string | number) => void;
  onReply: (
    commentId: number | string,
    content: string,
    replyingTo: string,
  ) => void;
  onUpdate: (id: number | string, content: string) => void;
  onUpVote: () => void;
  onDownVote: () => void;
  children?: ReactNode;
}

export default function Comment({
  comment: { content, createdAt, id, score, user },
  children,
  currentUser,
  replyingTo,
  onDelete,
  onReply,
  onUpVote,
  onDownVote,
  onUpdate,
}: CommentProps) {
  const [isReplyingTo, setReplyingTo] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEdtContent] = useState(content);

  const [containerRef] = useAutoAnimate();

  const editRef = useRef(null);

  useOutsideAlerter(editRef, () => setIsEditing(false));

  const isOwn = currentUser.username === user.username;

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 transition-all desktop:gap-5"
    >
      <article className="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 desktop:grid-cols-[auto_1fr_auto] desktop:gap-x-6 desktop:gap-y-4">
        <CommentInfo
          isOwn={isOwn}
          userAvatar={user.image.webp}
          userName={user.username}
          createdAt={createdAt}
          className="col-span-2 h-[32px] desktop:col-span-1"
        />

        {isEditing ? (
          <div ref={editRef} className="col-span-2 flex flex-col gap-4">
            <TextAreaAutoHeight
              value={editContent}
              onChange={(evt) => setEdtContent(evt.target.value)}
              autoFocus
              className="col-span-2 block h-auto min-h-[96px] w-full resize-none appearance-none rounded-lg border border-solid border-light-gray px-6 py-3 focus-visible:outline-moderate-blue desktop:col-span-1"
            />
            <button
              onClick={() => {
                onUpdate(id, editContent);
                setIsEditing(false);
              }}
              disabled={editContent.length === 0}
              className="w-[104px] justify-self-end rounded-lg bg-moderate-blue py-3 uppercase text-white hover:bg-light-grayish-blue disabled:bg-grayish-blue/25 desktop:col-start-3 desktop:row-start-1 desktop:h-fit"
            >
              Update
            </button>
          </div>
        ) : (
          <p className="col-span-2 text-body text-grayish-blue">
            {replyingTo && !isEditing && (
              <span className="text-heading-m text-moderate-blue">
                {`@ ${replyingTo} `}
              </span>
            )}
            {content}
          </p>
        )}

        <ButtonVote
          onDownVote={onDownVote}
          onUpVote={onUpVote}
          vote={score}
          className="desktop:col-start-1 desktop:row-span-2 desktop:row-start-1"
        />
        {isOwn ? (
          <OwnerButtonGroup
            onEdit={() => {
              setIsEditing(true);
              if (editRef.current) {
                editRef.current;
              }
            }}
            onDelete={() => setModalOpen(true)}
            className="h-[32px] justify-self-end desktop:col-start-3 desktop:row-start-1"
          />
        ) : (
          <ReplyButton
            onClick={() => {
              setReplyingTo(user.username);
            }}
            className="justify-self-end desktop:col-start-3 desktop:row-start-1"
          />
        )}
      </article>

      {isReplyingTo && (
        <AddComment
          onClickOutSide={() => setReplyingTo("")}
          currentUserAvatar={currentUser.image.webp}
          onAddComment={(content) => {
            onReply(id, content, isReplyingTo);
            setReplyingTo("");
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
