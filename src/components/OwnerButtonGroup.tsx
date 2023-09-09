interface OwnerButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const OwnerButtonGroup = ({
  className,
  ...rest
}: OwnerButtonGroupProps) => {
  return (
    <div className={`flex gap-4 ${className}`} {...rest}>
      <button className="w-fit flex items-center gap-2 justify-self-end desktop:row-start-1 desktop:col-start-3">
        <img src="/images/icon-delete.svg" alt="reply-icon" />
        <span className="text-body-bold text-soft-ed">Delete</span>
      </button>

      <button className="w-fit flex items-center gap-2 justify-self-end desktop:row-start-1 desktop:col-start-3">
        <img src="/images/icon-edit.svg" alt="reply-icon" />
        <span className="text-body-bold text-moderate-blue">Edit</span>
      </button>
    </div>
  );
};
