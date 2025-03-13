import React from "react";

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      

      
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
