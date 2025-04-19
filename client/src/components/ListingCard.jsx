import React from "react";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md flex flex-col  overflow-hidden hover:shadow-lg transition-shadow rounded-lg w-full  sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[200px] sm:h-[200px] hover:scale-105 transition-scale duration-300 ease-in-out  w-full object-cover"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="truncate text-xl font-semibold text-slate-700">
          {listing.name}
        </p>
        <div className="flex items-center text-sm text-gray-600 ">
          <FaMapMarkerAlt className="text-green-700 mr-1" />
          <span>{listing.address}</span>
        </div>
        <p className="text-gray-700  line-clamp-2">{listing.description}</p>
        <div className="flex justify-between items-center ">
          <p className="text-green-600 font-semibold">
            $
            {listing.offer
              ? +listing?.regularPrice - +listing?.discountPrice
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            {listing.type === "rent" && (
              <span className="text-gray-500 text-sm">/month</span>
            )}
          </p>
        </div>
        <div className="flex gap-3 text-sm text-slate-700 font-bold">
          <div>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds`
              : `${listing.bedrooms} bed `}
          </div>
          <div>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : `${listing.bathrooms} bathroom `}
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/listing/${listing._id}`}
            className="text-blue-600 font-semibold hover:underline text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
/*

 <div className="shadow-xl flex flex-col   max-w-3xs rounded-lg bg-slate-100 ">
      <img
        className="w-full h-1/2 rounded-lg"
        // src={listings.}
        alt="house png"
      />
      <h1 className="font-semibold  p-3">Ultra modern pent house....</h1>
      <div className="flex gap-2 items-center p-2">
      <FaLocationArrow/>
        <span>Adama</span>
        </div>

        <div className="flex items-center p-2">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, eveniet.</p>
        </div>

        <div>
            <h1 className="text-slate-700 tet-2xl p-2">500$ / month</h1>
            <div className="flex p-2 gap-3 font-semibold">
                <span>6 beds</span>
                <span>5 baths</span>
            </div>
        </div>
    </div>
*/
