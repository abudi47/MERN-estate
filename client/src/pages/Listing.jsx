import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa"; // Import the location icon
import Contact from "../components/Contact.jsx";
import SwiperCore from "swiper";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser?._id, listing?.userRef);
  // console.log(currentUser)

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.lisId;

      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetchListing();
  }, [params.lisId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && (
        <p className="text-center text-2xl text-gray-700">Loading...</p>
      )}
      {error && (
        <p className="text-center text-2xl text-red-500">
          Something went wrong...
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper
            navigation
            pagination
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      <div className="bg-white shadow-md shadow-amber-600 rounded-lg items-center mx-auto max-w-2xl p-6 mt-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          {listing?.name} {" - "}${" "}
          {listing?.offer
            ? +listing?.regularPrice - listing?.discountPrice
            : listing?.regularPrice}
          /month
        </h1>

        <p className="mt-5 text-md text-gray-600 flex items-center justify-center">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          {listing?.address}
        </p>
        <div className="mt-4 text-center">
          {listing?.type === "rent" ? (
            <p className="text-lg text-blue-600 font-semibold">For Rent</p>
          ) : (
            <div className="flex justify-center gap-2">
              <p className="mt-3 bg-red-600 max-w-[200px] rounded-md text-white text-center p-2">
                For Sale
              </p>
              {listing?.offer && (
                <p className="mt-3 bg-green-600 max-w-[200px] rounded-md text-white text-center p-2">
                  ${+listing?.regularPrice - listing?.discountPrice} Discount
                </p>
              )}
            </div>
          )}
        </div>

        <p className="mt-6 text-gray-700">
          <span className="text-black font-semibold">Description - </span>
          {listing?.description}
        </p>

        <ul className="mt-6 justify-center text-green-700 font-semibold text-sm flex gap-6 items-center sm:gap-8 flex-wrap">
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaBed className="text-lg" />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Beds`
              : `${listing?.bedrooms} Bed`}
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaBath className="text-lg" />
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} Bathrooms`
              : `${listing?.bathrooms} Bathroom`}
          </li>

          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaParking className="text-lg" />
            {listing?.parking ? "Parking" : "No Parking"}
          </li>
          <li className="flex items-center gap-2 whitespace-nowrap">
            <FaChair className="text-lg" />
            {listing?.furnished ? "Furnished" : "Not Furnished"}
          </li>
        </ul>

        {currentUser && listing?.userRef !== currentUser?._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-blue-600 w-full mt-6 rounded p-3 cursor-pointer text-center text-white uppercase hover:bg-blue-700 transition"
          >
            Contact Landlord
          </button>
        )}
        {contact && <Contact listing={listing} />}
        {/*  */}
      </div>
    </div>
  );
}
