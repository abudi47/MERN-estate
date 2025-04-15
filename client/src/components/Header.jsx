import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link,  useNavigate } from "react-router-dom";
import Signin from "../pages/Signin";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   {currentUser && console.log("Current User:", currentUser);
  //   console.log("fff", currentUser.photoURL);}
  // console.log("Current User:", currentUser); // Log the currentUser object
  const [searchTerm , setSearchTerm] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    console.log("search term", searchTerm);

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("search");
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    } 
  }, [location.search] )
  console.log("search term", searchTerm)

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">#Abd</span>
          <span className="text-slate-700">Estate</span>
        </h1>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3  rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search...."
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
             
          />

          <button> 
            
          <FaSearch className="text-slate-600" />
          </button>
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

          <Link to={"/profile"}>
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
