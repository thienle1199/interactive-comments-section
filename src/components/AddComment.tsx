import { useRef, useState } from "react";
import useOutsideAlerter from "../hooks/useOnClickOutSide";
import TextAreaAutoHeight from "./TextAreaAutoHeight";

interface AddCommentProps {
  currentUserAvatar: string;
  className?: string;
  onClickOutSide?: () => void;
  onAddComment: (comment: string) => void;
}

export default function AddComment({
  currentUserAvatar,
  className,
  onClickOutSide,
  onAddComment,
}: AddCommentProps) {
  const ref = useRef(null);
  const [value, setValue] = useState("");

  useOutsideAlerter(ref, onClickOutSide);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 gap-4 rounded-lg bg-white p-4 desktop:grid-cols-[auto_1fr_auto] ${className}`}
    >
      <TextAreaAutoHeight
        className="col-span-2 block h-auto min-h-[96px] w-full resize-none appearance-none rounded-lg border border-solid border-light-gray px-6 py-3 focus-visible:outline-moderate-blue desktop:col-span-1"
        placeholder="Add a comment"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        rows={2}
        autoFocus
      ></TextAreaAutoHeight>

      <img
        className="h-[32px] w-[32px] self-center desktop:col-start-1 desktop:row-start-1 desktop:h-[40px] desktop:w-[40px] desktop:self-start"
        src={currentUserAvatar}
        alt="avatar"
      />
      <button
        onClick={() => {
          onAddComment(value);
          setValue("");
        }}
        disabled={value.length === 0}
        className="w-[104px] justify-self-end rounded-lg bg-moderate-blue py-3 uppercase text-white hover:bg-light-grayish-blue disabled:bg-grayish-blue/25 desktop:col-start-3 desktop:row-start-1 desktop:h-fit"
      >
        Send
      </button>
    </div>
  );
}
