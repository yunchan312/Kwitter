import { auth } from "../firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={logOut}>logout</button>
    </div>
  );
}
