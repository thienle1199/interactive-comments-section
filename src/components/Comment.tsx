import { ReplyComment } from "../types";
import ButtonVote from "./ButtonVote";
import CommentInfo from "./CommentInfo";
import { OwnerButtonGroup } from "./OwnerButtonGroup";
import ReplyButton from "./ReplyButton";

interface CommentProps {
  isOwn?: boolean;
  userName: string;
  userAvatar: string;
  createdAt: string;
  vote: number;
  content: string;
  replies?: ReplyComment[];
}

export default function Comment({
  isOwn,
  vote,
  content,
  createdAt,
  userAvatar,
  userName,
  replies = [],
}: CommentProps) {
  return (
    <div className="flex flex-col gap-4 desktop:gap-5">
      <article className="p-6 grid grid-cols-2 desktop:grid-cols-[auto_1fr_auto] gap-4 desktop:gap-x-6 desktop:gap-y-4 rounded-lg  bg-white">
        <CommentInfo
          userAvatar={userAvatar}
          userName={userName}
          createdAt={createdAt}
          className="col-span-2 desktop:col-span-1"
        />
        <p className="text-body text-grayish-blue col-span-2">{content}</p>
        <ButtonVote
          vote={vote}
          className="desktop:row-start-1 desktop:col-start-1 desktop:row-span-2"
        />
        {isOwn ? (
          <OwnerButtonGroup className="desktop:row-start-1 desktop:col-start-3 justify-self-end" />
        ) : (
          <ReplyButton className="desktop:row-start-1 desktop:col-start-3 justify-self-end" />
        )}
      </article>

      {replies.length > 0 && (
        <div className="flex">
          <div className="w-[2px] flex-shrink-0 bg-light-gray mx-4 desktop:mx-11"></div>
          <div className="flex flex-col gap-4 desktop:gap-6">
            {replies.map((rep) => (
              <Comment
                key={rep.id}
                content={rep.content}
                createdAt={rep.createdAt}
                userAvatar={rep.user.image.webp}
                userName={rep.user.username}
                vote={rep.score}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
