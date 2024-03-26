import { IKiwi } from "./timeline";

export default function Kiwi({ username, photo, kiwi }: IKiwi) {
  return (
    <div className="border-2 border-kiwiCeed rounded-xl py-3 px-5 mb-5">
      <div className="font-bold text-xl">{username}</div>

      <div className="flex justify-between items-center">
        <div className="text-lg">{kiwi}</div>
        {photo ? (
          <div>
            <img
              src={`${photo}`}
              className="max-w-[150px] max-h-[250px] rounded-lg shadow-lg"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
