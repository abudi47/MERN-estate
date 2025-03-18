import React from "react";

export default function CreateListing() {
  return (
    <main className="mx-auto p-3 max-w-4xl">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form className="flex flex-col  sm:flex-row">
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
        </div>
      </form>
    </main>
  );
}
