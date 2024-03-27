import PostTweetForm from "../components/post-tweet-form";
import TimeLine from "../components/timeline";

export default function Home() {
  return (
    <>
      <div className="grid grid-template-rows-[1fr_5fr] gap-1 h-[90vh]">
        <div className="overflow-y-scroll no-scrollbar">
          <TimeLine />
        </div>
        <PostTweetForm />
      </div>
    </>
  );
}
