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
      className={`grid grid-cols-2 desktop:grid-cols-[auto_1fr_auto] p-4 gap-4 bg-white rounded-lg ${className}`}
    >
      <TextAreaAutoHeight
        className="col-span-2 min-h-[96px] desktop:col-span-1 focus-visible:outline-moderate-blue appearance-none block w-full px-6 py-3 rounded-lg resize-none h-auto border-light-gray border-solid border"
        placeholder="Add a comment"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        rows={2}
        autoFocus
      ></TextAreaAutoHeight>

      <img
        className="h-[32px] w-[32px] desktop:h-[40px] desktop:w-[40px] self-center desktop:self-start desktop:col-start-1 desktop:row-start-1"
        src={currentUserAvatar}
        alt="avatar"
      />
      <button
        onClick={() => {
          onAddComment(value);
          setValue("");
        }}
        className="desktop:row-start-1 desktop:h-fit desktop:col-start-3 justify-self-end uppercase py-3 w-[104px] bg-moderate-blue text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
