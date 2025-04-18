import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [offerListing, setOfferListng] = useState([]);
  const [saleLisintg, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListng(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  console.log(offerListing);
  console.log(rentListing);
  console.log(saleLisintg);
  return (
    <div>
      {/* top*/}
      <div className="flex flex-col gap-6 p-28 px-3 mx-auto max-w-6xl">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find tour next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm ">
          Abd Estate will help you find your home fast , east and comfortable
          <br /> Our expert support are always available{" "}
        </div>

        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started....
        </Link>
      </div>

      {/* swiper*/}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[450px]"
                key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="my-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700 ">Recent offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
            </div>

            <div className="flex   flex-wrap  gap-4   ">
              {offerListing.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListing && rentListing.length > 0 && (
          <div className="my-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700 ">Recent places for Rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>Show more places for rent</Link>
            </div>

            <div className="flex   flex-wrap  gap-4   ">
              {rentListing.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {saleLisintg && saleLisintg.length > 0 && (
          <div className="my-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700 "> Recent places for Sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"}>Show more places for sale </Link>
            </div>

            <div className="flex   flex-wrap  gap-4   ">
              {saleLisintg.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
