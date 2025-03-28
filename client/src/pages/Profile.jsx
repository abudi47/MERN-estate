import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
// import { account } from "../appWrite/appwriteConfig";
import { storage } from "../appWrite/appwriteConfig";
import { Await } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  deleteFailed,
  deleteStart,
  deleteSuccess,
  updateFailed,
  updateStart,
  updateSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailed,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [updateSuccesser, setUpdateSuccesser] = useState(false);

  const dispatch = useDispatch();

  console.log(file);
  console.log(currentUser.username);

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
      const response = await storage.createFile(
        "67d5712d002738777653",
        fileId,
        file
      );
      console.log("Upload successful:", response);

      const imageUrl = storage.getFilePreview(
        "67d5712d002738777653",
        response.$id
      );
      setImageUrl(imageUrl);
      setFormData({ ...formData, avatar: imageUrl });
      console.log(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(currentUser._id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailed(data.message));
        return;
      }

      dispatch(updateSuccess(data));
      setUpdateSuccesser(true);
    } catch (error) {
      dispatch(updateFailed(error.message));
    }
  };

  const deleteHandler = async () => {
    console.log("deleting ....");
    try {
      dispatch(deleteStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteFailed(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailed(error.message));
    }
  };

  const signOutHandler = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch(`api/auth/signout`);
      const data = res.json();
      if (data.success === false) {
        dispatch(signoutFailed(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailed(error.message));
    }
  };
  console.log("the data", formData);
  console.log("the image url ", imageUrl);
  return (
    <div>
      <div className="max-w-lg mx-auto p-3 mY-7">
        <h1 className="text-3xl font-semibold text-center mx-auto">Profile</h1>
        <form className="flex mt-7 flex-col gap-4" onSubmit={handleSubmit}>
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
          {imageUrl && (
            <p className="text-green-600 text-center">
              Image uploaded successfully!
            </p>
          )}
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="username"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="email"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            className="border-slate-400 focus:outline-none bg-white border rounded-lg p-2.5"
            onChange={handleChange}
          />
          
          <button
            disabled={loading}
            className="bg-slate-800 p-2.5 text-amber-50 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link to={"/create-listing"} className="bg-green-600 p-2.5 text-center text-amber-50 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            create listing
          </Link>
        </form>
        <div className="flex justify-between mt-4">
          <span onClick={deleteHandler} className="text-red-800 cursor-pointer">
            Delete account
          </span>
          <span onClick={signOutHandler} className="text-red-800 cursor-pointer">Sign out</span>
        </div>
        <p className="text-red-950">{error ? error : ""}</p>
        <p className="text-green-700">
          {updateSuccesser ? "user is updated successfully..." : ""}
        </p>
      </div>
    </div>
  );
}
