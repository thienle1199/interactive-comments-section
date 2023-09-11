interface OwnerButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  onDelete: () => void;
  onEdit: () => void;
}

export const OwnerButtonGroup = ({
  onDelete,
  onEdit,
  className,
  ...rest
}: OwnerButtonGroupProps) => {
  return (
    <div className={`flex gap-4 ${className}`} {...rest}>
      <button
        onClick={onDelete}
        className="flex w-fit items-center gap-2 justify-self-end desktop:col-start-3 desktop:row-start-1"
      >
        <img src="/images/icon-delete.svg" alt="reply-icon" />
        <span className="text-body-bold text-soft-ed">Delete</span>
      </button>

      <button
        onClick={onEdit}
        className="flex w-fit items-center gap-2 justify-self-end desktop:col-start-3 desktop:row-start-1"
      >
        <img src="/images/icon-edit.svg" alt="reply-icon" />
        <span className="text-body-bold text-moderate-blue">Edit</span>
      </button>
    </div>
  );
};
