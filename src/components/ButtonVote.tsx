interface ButtonVoteProps {
  className?: string;
}

export default function ButtonVote({ className }: ButtonVoteProps) {
  return (
    <div
      className={`bg-very-light-gray desktop:flex-col desktop:w-[40px] desktop:h-[100px] items-center justify-between flex rounded-[10px] gap-[10px] p-3 h-[40px]  w-[100px] ${className}`}
    >
      <button className="h-full w-full">
        <img
          className="w-[10px] h-[10px] m-auto text-light-grayish-blue"
          src="./images/icon-plus.svg"
          alt=""
        />
      </button>
      <span className="text-moderate-blue text-body-bold">12</span>
      <button className="h-full w-full">
        <img
          className="w-[10px] h-[2.5px] m-auto text-light-grayish-blue"
          src="./images/icon-minus.svg"
          alt=""
        />
      </button>
    </div>
  );
}
