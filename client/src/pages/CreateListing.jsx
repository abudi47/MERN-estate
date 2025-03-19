import React, { useState } from "react";
import { storage } from "../appWrite/appwriteConfig";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [uploading, setUploading] = useState(false);

  const [imageUploadError, setImageUploadError] = useState(null);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = Array.from(files).map((file) => storeImage(file));

      try {
        const imageUrls = await Promise.all(promises);
        setFormData({ ...formData, imageUrls });
        console.log("All images uploaded successfully:", imageUrls);

        setImageUploadError(true);   
        setUploading(false);
      } catch (error) {
        console.error("Error uploading images:", error);
        setImageUploadError("Image upload failed,(2 MB) MAX per image ");
      }
    } else {
      console.error("Please upload between 1 and 6 images.");
      setImageUploadError(
        "You can upload a minimum of 1 and a maximum of 6 images"
      );
      setUploading(false);
    }
  };
  // Function to store an image in storage
  const storeImage = async (file) => {
    try {
      const fileId = `unique()`; // Generates a unique ID
      const response = await storage.createFile(
        "67d5712d002738777653",
        fileId,
        file
      );
      console.log("Responsss", response);
      const imageUrl = storage.getFilePreview(
        "67d5712d002738777653",
        response.$id
      );
      console.log("Image URL:", imageUrl);
      return imageUrl; // Return the file URL
    } catch (error) {
      console.error("Error storing image:", error);
      throw error;
    }
  };
  console.log("The data....", formData);
  console.log("filesss....", files);

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="mx-auto p-3 max-w-4xl">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form className="flex flex-col  sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            className="p-3 bg-white border border-gray-200 rounded-lg "
            placeholder="Name"
            id="name"
            required
          />
          <input
            className="p-5 bg-white border border-gray-200 rounded-lg "
            placeholder="Description"
            id="description"
          />
          <input
            className="p-3 bg-white border border-gray-200 rounded-lg "
            placeholder="Address"
            id="address"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex  gap-6 flex-wrap">
            <div className="flex items-center gap-2 ">
              <input
                className="p-3 border border-gray-200 rounded-lg "
                placeholder=""
                type="number"
                id="bedrooms"
                min={1}
                max={10}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                className="p-3 border border-gray-200 rounded-lg "
                placeholder=""
                type="number"
                id="bathrooms"
                min={1}
                max={10}
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                className="p-5 border border-gray-200 rounded-lg "
                placeholder=""
                type="number"
                id="regularPrice"
                min={1}
                max={10}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">( $/Month )</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                className="p-5 border border-gray-200 rounded-lg "
                placeholder=""
                type="number"
                id="bedrooms"
                min={1}
                max={10}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">( $/Month )</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              className="p-3 border shadow border-gray-300 rounded w-full"
              id="images"
              multiple
              accept="image/*"
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80 border-green-700"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div className="flex justify-between items-center p-3">
                <img
                  key={url}
                  src={url}
                  alt="uploaded"
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 rounded-lg text-red-700 uppercase hover:opacity-75 "
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="text-white p-3 my-2 uppercase rounded-lg  bg-slate-700 hover:opacity-95 disabled:opacity-80">
            Create listing{" "}
          </button>
        </div>
      </form>
    </main>
  );
}
