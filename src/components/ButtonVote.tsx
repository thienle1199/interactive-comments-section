interface ButtonVoteProps {
  className?: string;
  vote: number;
  onUpVote: () => void;
  onDownVote: () => void;
}

export default function ButtonVote({
  className,
  vote = 0,
  onDownVote,
  onUpVote,
}: ButtonVoteProps) {
  return (
    <div
      className={`flex h-[40px] w-[100px] items-center justify-between gap-[10px] rounded-[10px] bg-very-light-gray p-3 desktop:h-[100px] desktop:w-[40px]  desktop:flex-col ${className}`}
    >
      <button onClick={onUpVote} className="h-full w-full">
        <img
          className="m-auto h-[10px] w-[10px] text-light-grayish-blue"
          src="./images/icon-plus.svg"
          alt=""
        />
      </button>
      <span className="text-body-bold text-moderate-blue">{vote}</span>
      <button onClick={onDownVote} className="h-full w-full">
        <img
          className="m-auto h-[2.5px] w-[10px] text-light-grayish-blue"
          src="./images/icon-minus.svg"
          alt=""
        />
      </button>
    </div>
  );
}
