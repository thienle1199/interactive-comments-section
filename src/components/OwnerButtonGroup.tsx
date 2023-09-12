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
        className="flex w-fit items-center gap-2 justify-self-end text-soft-ed hover:text-pale-red desktop:col-start-3 desktop:row-start-1"
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
            fill="currentColor"
          />
        </svg>{" "}
        <span className="text-body-bold ">Delete</span>
      </button>

      <button
        onClick={onEdit}
        className="flex w-fit items-center gap-2 justify-self-end text-moderate-blue hover:text-light-grayish-blue desktop:col-start-3 desktop:row-start-1"
      >
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
            fill="currentColor"
          />
        </svg>{" "}
        <span className="text-body-bold ">Edit</span>
      </button>
    </div>
  );
};
