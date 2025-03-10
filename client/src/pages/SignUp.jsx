import React from "react";
import { Link } from "react-router-dom";

export default function SignUP() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl ">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          className="border p-2.5 rounded-lg"
          placeholder="username"
        />
        <input
          type="email"
          className="border p-2.5 rounded-lg"
          placeholder="email"
        />
        <input
          type="password"
          className="border p-2.5 rounded-lg"
          placeholder="password"
        />
        <button className="bg-slate-900 text-white p-3 border rounded-lg hover:opacity-95 disabled:opacity-55">
          Sign up
        </button>
      </form>

      <div className="flex gap-3 mt-5">
        <p>Have an a account ?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign in</span>
        
        </Link>
      </div>
    </div>
  );
}
