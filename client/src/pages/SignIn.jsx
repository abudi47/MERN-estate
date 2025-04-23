import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/profile");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div>
      <div className="p-3 mt-7 max-w-lg mx-auto">
        <h1 className="font-semibold text-center text-slate-700 text-3xl mb-8">
          Sign In{" "}
        </h1>
        <form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            className=" border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            className="border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none"
            placeholder="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="p-3 bg-slate-900 text-white border rounded-lg "
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="mt-3 flex">
          <p>Don't you have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-600 ml-3">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-white mt-5 ">{error}</p>}
      </div>
    </div>
  );
}
