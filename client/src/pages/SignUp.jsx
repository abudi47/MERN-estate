import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUP() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data)
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl ">Sign Up</h1>
      <form
        className=" bg-slate-100 flex flex-col gap-4 "
        onSubmit={handleSubmit}
      >
        <input
          id="username"
          type="text"
          className="border p-2.5 rounded-lg"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          className="border p-2.5 rounded-lg"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          className="border p-2.5 rounded-lg"
          placeholder="password"
          onChange={handleChange}
        />
        <button className="bg-slate-900 text-white p-3 border rounded-lg hover:opacity-95 disabled:opacity-55">
          Sign up
        </button>
      </form>

      <div className="flex gap-3 mt-5">
        <p>Have an a account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
