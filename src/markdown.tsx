import Markdown from "react-markdown";

export default function Test({ kiwi }: any) {
  return (
    <div className="markdown w-[100%]">
      <Markdown>{kiwi}</Markdown>
    </div>
  );
}
