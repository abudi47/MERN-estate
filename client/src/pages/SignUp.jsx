import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";

export default function SignUP() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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
          className="border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          className="border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none"
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
          className="bg-slate-900 text-white p-3 border rounded-lg hover:opacity-95 disabled:opacity-55"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-3 mt-5">
        <p>Have an a account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 ">{error}</p>}
    </div>
  );
}
