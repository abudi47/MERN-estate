import React from "react";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email,
        }),
      });
      console.log("Google Photo URL:", result.user.photoURL);
      console.log(res);
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-500 text-white p-3  rounded-lg hover:opacity-95 uppercase"
    >
      continue with Google
    </button>
    
  );
}
