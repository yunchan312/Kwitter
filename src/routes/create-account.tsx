import { useState } from "react";

export default function Create() {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //create account.
      //set the name of the user.
      //re direct to the home page.
    } catch (e) {
      //set the error
    } finally {
      setLoading(false);
    }

    console.log(name, email, password);
  };
  return (
    <div className="h-[100%] flex flex-col w-[420px] justify-center items-center px-[50px] py-[10px]">
      <div className="text-[42px]">Log into Kwitter</div>
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
