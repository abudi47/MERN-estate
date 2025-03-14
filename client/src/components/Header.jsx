import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Signin from "../pages/Signin";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   {currentUser && console.log("Current User:", currentUser);
  //   console.log("fff", currentUser.photoURL);}
  console.log("Current User:", currentUser); // Log the currentUser object

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">#Abd</span>
          <span className="text-slate-700">Estate</span>
        </h1>

        <form className="bg-slate-100 p-3  rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search...."
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden text-slate-700 sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden text-slate-700 sm:inline hover:underline">
              About
            </li>
          </Link>

          <Link to={"/sign-in"}>
            {currentUser ? (
              <img
                className="rounded-full object-cover h-8 w-8"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
