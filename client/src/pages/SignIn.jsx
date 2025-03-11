import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div>
      <div className="text-center mt-7 max-w-lg mx-auto">
        <h1 className="font-semibold  text-slate-700 text-3xl mb-8">
          Sign In{" "}
        </h1>
        <form className="flex flex-col gap-4">
          <input className=" border rounded-lg p-2.5 " placeholder="email" />
          <input className="border rounded-lg p-2.5 " placeholder="password" />
          <button className="p-3 bg-slate-900 text-white border rounded-lg ">
            Sign In
          </button>
        </form>
        <div className="mt-3 flex">
            <p>Don't you have an account?</p>
            <Link to={'sign-up'}>
                <span className="text-blue-600 ml-3">Sign up</span>
            </Link>
        </div>
      </div>
    </div>
  );
}
