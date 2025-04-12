import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landloard, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandloard = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandloard();
  }, [listing?.userRef]);
  console.log(landloard);

  return (
    <div>
      <div className="mt-6">
        <p className="flex items-center justify-center text-gray-700">
          Contact{" "}
          <span className="font-semibold px-1">{landloard?.username}</span> for{" "}
          <span className="font-semibold px-1">{listing?.name}</span> House
        </p>
        <textarea
          name="message"
          id="message"
          rows="2"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-gray-50  border border-gray-300 w-full rounded mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your message here"
        ></textarea>
      </div>
      <Link
        to={`mailto:${landloard?.email}?subject=Regarding ${listing?.name}&body=${message}`}
        className="block bg-blue-600 w-full mt-6 rounded p-3 cursor-pointer text-center text-white uppercase hover:bg-blue-700 transition"
      >
        Send a message
      </Link>
    </div>
  );
}
