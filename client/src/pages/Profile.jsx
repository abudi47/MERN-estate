import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { account, storage } from "../appWrite/appwriteConfig";
import { Await } from "react-router-dom";


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }; 

 
  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    try {
      const fileId = `unique()`; // Generates a unique ID
      const response = await storage.createFile("67d5712d002738777653", fileId, file);
      console.log("Upload successful:", response);

      const imageUrl = storage.getFilePreview("67d5712d002738777653", response.$id);
      setImageUrl(imageUrl);
      console.log(imageUrl)
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  
  return (
    <div>
      <div className="max-w-lg mx-auto p-3 mY-7">
        <h1 className="text-3xl font-semibold   text-center  mx-auto">
          Profile
        </h1>
        <form className="flex mt-7 flex-col gap-4 " onSubmit={handleFileUpload}>
          <input
            onChange={handleFileChange}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full h-30 w-30 self-center object-cover cursor-pointer"
            src={imageUrl || currentUser.avatar}
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
