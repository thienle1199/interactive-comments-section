interface CommentInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string;
  userAvatar: string;
  createdAt: string;
}

export default function CommentInfo({
  className,
  userAvatar,
  userName,
  createdAt,
}: CommentInfoProps) {
  return (
    <div className={`flex gap-4 items-center col-span-2 ${className}`}>
      <img className="w-8 h-8" src={userAvatar} alt="avatar" />
      <span className="text-heading-m text-dark-blue">{userName}</span>
      <span className="text-body text-grayish-blue">{createdAt}</span>
    </div>
  );
}
