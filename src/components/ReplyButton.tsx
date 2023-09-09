interface ReplyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ReplyButton({ className, ...rest }: ReplyButtonProps) {
  return (
    <button className={`w-fit flex items-center gap-2 ${className}`} {...rest}>
      <img src="/images/icon-reply.svg" alt="reply-icon" />
      <span className="text-body-bold text-moderate-blue">Reply</span>
    </button>
  );
}
