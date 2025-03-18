import React from "react";

export default function CreateListing() {
  return (
    <main className="mx-auto p-3 max-w-4xl">
      <div>
        <div className="">
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

              <div className="flex gap-3 ">
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <input type="checkbox" id="sale" className="w-5" />
                    <span className="">Sell</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" id="rent" className="w-5" />
                    <span className="">Rent</span>
                  </div>
                  <div>
                  <input type="checkbox" id="sale" className="w-5" />
                  <span className="">Parking Spot</span>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="sale" className="w-5" />
                  <span className="">Sell</span>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="sale" className="w-5" />
                  <span className="">Sell</span>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" id="sale" className="w-5" />
                  <span className="">Sell</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
