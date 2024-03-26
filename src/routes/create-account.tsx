import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp = e.target.name;
    if (temp === "nickname") {
      setName(e.target.value);
    } else if (temp === "password") {
      setPassword(e.target.value);
    } else if (temp === "email") {
      setEmail(e.target.value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e: any) {
      //set the error
      console.log(e.code);
    } finally {
      setLoading(false);
    }

    console.log(name, email, password);
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
          name="nickname"
          placeholder="Nickname"
          type="text"
          required
        />
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
      {error !== "" ? (
        <div className="font-bold text-red-400">{error}</div>
      ) : null}
    </div>
  );
}
