import { PacmanLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="wrapper h-[100vh] flex flex-col justify-center items-center">
      <PacmanLoader color="#00d26a" size={25} />
      <div className="text-kiwiCeed text-[24px]">Loading..</div>
    </div>
  );
}
