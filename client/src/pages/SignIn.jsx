import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [error, setError] = useState(""); // Store error message
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signin", {
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
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
            className=" border bg-white rounded-lg p-2.5 "
            placeholder="email"
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            className="border bg-white rounded-lg p-2.5 "
            placeholder="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="p-3 bg-slate-900 text-white border rounded-lg "
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="mt-3 flex">
          <p>Don't you have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-600 ml-3">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5 ">{error}</p>}

      </div>
    </div>
  );
}
