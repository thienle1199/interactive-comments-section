interface CommentInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string;
  userAvatar: string;
  createdAt: string;
  isOwn?: boolean;
}

export default function CommentInfo({
  className,
  userAvatar,
  userName,
  createdAt,
  isOwn,
}: CommentInfoProps) {
  return (
    <div className={`flex gap-4 items-center col-span-2 ${className}`}>
      <img className="w-8 h-8" src={userAvatar} alt="avatar" />
      <span className="text-heading-m text-dark-blue">{userName}</span>
      {isOwn && (
        <span className="bg-moderate-blue rounded-sm font-[13px] text-white px-[6px]">
          you
        </span>
      )}
      <span className="text-body text-grayish-blue">{createdAt}</span>
    </div>
  );
}
