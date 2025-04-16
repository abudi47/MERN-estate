import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-7 border-b-2 border-slate-300 shadow-slate-50 shadow-xl  md:border-r-2">
        <form className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none "
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent&sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2  flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort :</label>
            <select
              id="sort_order"
              className="border rounded-lg p-2 w-full bg-white  border-amber-50 shadow-md shadow-slate-600 focus:outline-none "
            >
              <option value="all">Price high to low</option>
              <option value="all">Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 p-3 rounded-lg text-white font-semibold hover:bg-slate-800 transition duration-200 ease-in-out uppercase cursor-pointer">
            search
          </button>
        </form>
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-slate-700 p-3 mt-5">Listing results:</h1>
      </div>
    </div>
  );
}
