import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
export default function Search() {
  const [sidebardata, setsidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setsidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setsidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setsidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setsidebardata({ ...sidebardata, sort, order });
    }
  };
  console.log(sidebardata);

  const [showmore, setShowmore] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeFormUrl = urlParams.get("type");
    const parkingFormUrl = urlParams.get("parking");
    const furnishedFormUrl = urlParams.get("furnished");
    const offerFormUrl = urlParams.get("offer");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");

    if (
      searchTermFormUrl ||
      typeFormUrl ||
      parkingFormUrl ||
      furnishedFormUrl ||
      offerFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setsidebardata({
        searchTerm: searchTermFormUrl || "",
        type: typeFormUrl || "all",
        parking: parkingFormUrl === "true" ? true : false,
        furnished: furnishedFormUrl === "true" ? true : false,
        offer: offerFormUrl === "true" ? true : false,
        sort: sortFormUrl || "created_at",
        order: orderFormUrl || "desc",
      });

      const fetchListings = async () => {
        setLoading(true);
        setShowmore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        const acceptedListings = data.filter(
          (listing) => listing.status === "accepted"
        );
        if (data.length > 8) {
          setShowmore(true);
        } else {
          setShowmore(false);
        }
        setListings(acceptedListings);
        setLoading(false);
      };
      fetchListings();
    }
  }, [location.search]);
  const onClickShowMore = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowmore(false);
    }
    setListings([...listings, ...data]);
  };
  console.log(listings);
  // console.log("addressssssss",listings[0])
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-7 border-b-2 border-slate-300 shadow-slate-50 shadow-xl  md:border-r-2">
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full bg-white border-amber-50 shadow-md shadow-slate-600 focus:outline-none "
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                checked={sidebardata.type === "all"}
                onChange={handleChange}
                type="checkbox"
                id="all"
                className="w-5"
              />
              <span>Rent&sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2  flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort :</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-2 w-full bg-white  border-amber-50 shadow-md shadow-slate-600 focus:outline-none "
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 p-3 rounded-lg text-white font-semibold hover:bg-slate-800 transition duration-200 ease-in-out uppercase cursor-pointer">
            search
          </button>
        </form>
      </div>

      <div className="p-7   flex flex-col gap-5 md:w-full ">
        <h1 className="text-3xl font-semibold text-slate-700  mt-5">
          Listing results:
        </h1>
        {/* <div className="flex flex-col gap-6 sm:items-center  md:grid md:grid-cols-2 lg:grid-cols-3">
          <ListingCard listings={listings} loading={loading} />

        </div> */}
        <div className=" flex flex-wrap items-center justify-center my-auto gap-4  w-full p-4 ">
          {!loading && listings.length === 0 && (
            <h1 className="text-xl flex font-semibold text-slate-700  mt-5">
              No listings found!
            </h1>
          )}
          {loading && (
            <div className="flex items-center  justify-center mt-2">
              <div className="w-32 h-32  border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          {showmore && (
            <button
              onClick={onClickShowMore}
              className="text-green-600 hover:underline font-semibold hover:text-green-800 transition duration-200 ease-in-out w-full cursor-pointer"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
