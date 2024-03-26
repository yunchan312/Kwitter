import PostTweetForm from "../components/post-tweet-form";
import TimeLine from "../components/timeline";

export default function Home() {
  return (
    <>
      <div className="grid grid-template-rows-[1fr_5fr] gap-10 px-5 h-[90vh]">
        <div className="border-2 overflow-y-scroll">
          <TimeLine />
        </div>
        <PostTweetForm />
      </div>
    </>
  );
}
