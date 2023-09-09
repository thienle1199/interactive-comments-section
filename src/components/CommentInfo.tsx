interface CommentInfoProps {
  className?: string;
}

export default function CommentInfo({ className }: CommentInfoProps) {
  return (
    <div className={`flex gap-4 items-center col-span-2 ${className}`}>
      <img
        className="w-8 h-8"
        src="./images/avatars/image-amyrobson.webp"
        alt="avatar"
      />
      <span className="text-heading-m text-dark-blue">amyrobson</span>
      <span className="text-body text-grayish-blue">1 month ago</span>
    </div>
  );
}
