import ButtonVote from "./ButtonVote";
import CommentInfo from "./CommentInfo";

export default function Comment() {
  return (
    <article className="p-6 grid grid-cols-2 desktop:grid-cols-[auto_1fr_auto] gap-4 desktop:gap-6 rounded-lg w-full bg-white">
      <CommentInfo className="col-span-2 desktop:col-span-1" />
      <p className="text-body text-grayish-blue col-span-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        quae non iste dolor quidem beatae enim, porro laborum quia debitis
        libero in numquam architecto molestiae dolorem accusamus quis magni
        voluptatibus.
      </p>
      <ButtonVote className="desktop:row-start-1 desktop:col-start-1 desktop:row-span-2" />
      <button className="w-fit flex items-center gap-2 justify-self-end desktop:row-start-1 desktop:col-start-3">
        <img src="/images/icon-reply.svg" alt="reply-icon" />
        <span className="text-body-bold text-moderate-blue">Reply</span>
      </button>
    </article>
  );
}
