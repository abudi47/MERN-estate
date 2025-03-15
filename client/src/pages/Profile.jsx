import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="max-w-lg mx-auto p-3 mY-7">
        <h1 className="text-3xl font-semibold   text-center  mx-auto">
          Profile
        </h1>
        <form className="flex mt-7 flex-col gap-4 ">
          <img
            className="rounded-full h-30 w-30 self-center object-cover cursor-pointer"
            src={currentUser.avatar}
            alt="profile"
          />
          <input
            type="text"
            placeholder="username"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
          />
          <input
            type="email"
            placeholder="email"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
          />
          <input
            type="password"
            placeholder="password"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
          />

          <button className="bg-slate-800 p-2.5 text-amber-50 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            update
          </button>
          <button className="bg-green-600 p-2.5 text-amber-50 uppercase rounded-lg  hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </form>
        <div className="flex justify-between mt-4 ">
          <span className="text-red-800 cursor-pointer">Delete account</span>
          <span className="text-red-800 cursor-pointer">Sign out</span>
        </div>
      </div>
    </div>
  );
}
