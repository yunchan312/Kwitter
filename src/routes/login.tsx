import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp = e.target.name;
    if (temp === "password") {
      setPassword(e.target.value);
    } else if (temp === "email") {
      setEmail(e.target.value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;
    setError("");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        setError(e.message);
      }
      //set the error
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100%] flex flex-col w-[420px] justify-center items-center px-[50px] py-[10px]">
      <div className="text-[42px]">Log into 🥝</div>
      <form
        className="mt-[50px] flex flex-col gap-5 w-[100%]"
        onSubmit={onSubmit}
      >
        <input
          className="inputs-default"
          onChange={onChange}
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="inputs-default"
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <input
          className="inputs-default"
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </form>
      {error !== "" ? <div className="text-red-400">{error}</div> : null}
      <div>
        Don't have an account?
        <Link to="/create-account" className="text-kiwi hover:text-kiwiCenter">
          Create one &rarr;
        </Link>
      </div>
    </div>
  );
}
