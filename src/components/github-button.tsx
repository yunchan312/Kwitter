import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };
  return (
    <button
      onClick={onClick}
      className="bg-kiwi px-[20px] py-[10px] rounded-3xl border-none flex gap-2 items-center justify-center w-[100%] hover:bg-kiwiCenter"
    >
      <img className="h-[25px]" src="/github-logo.svg" />
      Continue with Github
    </button>
  );
}
