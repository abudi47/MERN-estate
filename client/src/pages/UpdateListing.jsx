import React, { useEffect, useState } from "react";
import { storage } from "../appWrite/appwriteConfig";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    regularPrice: 50,
    discountPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "textarea" ||
      e.target.type === "text"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const [uploading, setUploading] = useState(false);

  const [imageUploadError, setImageUploadError] = useState(null);
  console.log("formdata is...", formData);
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
        "67ecde970033388e34f9",
        fileId,
        file
      );
      console.log("Response:", response);

      const imageUrl = storage.getFileView(
        "67ecde970033388e34f9",
        response.$id
      );
      console.log("Image URL:", imageUrl); // Log the image URL
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
  console.log("Current user is ", currentUser);
  const handleSubmit = async (e) => {
    try {
      if (formData.imageUrls.length < 1)
        return setError("Please upload an image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price cannot be greater than regular price");

      e.preventDefault();
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.lisId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      if (!res.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await res.json();
      console.log("Created Listing Data:", data); // Log the response
      if (!data._id) {
        throw new Error("Listing ID is missing in the response");
      }
      setLoading(false);
      if (data.success === "false") {
        setError(data.message);
      }
      navigate(`/listings/${data._id}`); // Redirect to the newly created listing
      console.log("dataisssssssss", data._id);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.lisId;
      console.log(listingId);
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);
  return (
    <main className="mx-auto p-3 max-w-4xl">
      <h1 className="text-3xl font-semibold text-center my-7 ">Edit Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            className="p-3 bg-white border border-gray-200 rounded-lg "
            placeholder="Name"
            id="name"
            required
            onChange={handleChange} // Add this line
            value={formData.name} // Add this line
          />
          <input
            className="p-5 bg-white border border-gray-200 rounded-lg "
            placeholder="Description"
            id="description"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            className="p-3 bg-white border border-gray-200 rounded-lg "
            placeholder="Address"
            id="address"
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                className="p-5 border border-gray-200 rounded-lg "
                placeholder=""
                type="number"
                id="regularPrice"
                min={50}
                max={1000000}
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">( $/Month )</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2 ">
                <input
                  className="p-5 border border-gray-200 rounded-lg "
                  placeholder=""
                  type="number"
                  id="discountPrice"
                  min={50}
                  max={1000000}
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">( $/Month )</span>
                </div>
              </div>
            )}
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
              {uploading ? "Uploading....." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {console.log("image url isssss", formData.imageUrls)}

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
          <button
            disabled={loading || uploading}
            className="text-white p-3 my-2 uppercase rounded-lg  bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating....." : "update Listing"}
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  );
}
