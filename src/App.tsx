import Comment from "./components/Comment";
import data from "../data.json";
import { DataType } from "./types";

function App() {
  console.log(data);
  const currentUserName = (data as DataType).currentUser.username;

  return (
    <main className="font-rubik px-4 py-8 desktop:py-16 container mx-auto max-w-[1024px]">
      <div className="flex flex-col gap-4 desktop:gap-5">
        {(data as DataType).comments.map((comment) => (
          <Comment
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            userAvatar={comment.user.image.webp}
            userName={comment.user.username}
            vote={comment.score}
            isOwn={comment.user.username === currentUserName}
            replies={comment.replies}
          />
        ))}
      </div>
    </main>
  );
}
export default App;
