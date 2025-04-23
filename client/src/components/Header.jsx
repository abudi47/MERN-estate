import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Signin from "../pages/Signin";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   {currentUser && console.log("Current User:", currentUser);
  //   console.log("fff", currentUser.photoURL);}
  // console.log("Current User:", currentUser); // Log the currentUser object
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingSearch, setLoadingSearch] = useState("false");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  console.log("search term", searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");

    try {
      setLoadingSearch(true);
      if (searchTermFormUrl) {
        setSearchTerm(searchTermFormUrl);
      }
    } catch (error) {
      console.log(error)
    }finally {
      setLoadingSearch(false);
    }
  }, [location.search]);
  console.log("search term", searchTerm);

  return (
    <header className="bg-slate-900 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link
          to={"/"}
          className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer"
        >
          <span className="text-gray-300">Abd</span>
          <span className="text-gray-300">Estate</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3  rounded-lg flex items-center "
        >
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

        <ul className="flex gap-5 justify-center items-center">
          <Link to={"/"} id="home">
            <li className="hidden text-gray-300 sm:inline hover:underline font-bold">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden text-gray-300 sm:inline hover:underline font-bold">
              About
            </li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full object-cover w-11 h-11 self-center"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-gray-300 font-bold  hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
