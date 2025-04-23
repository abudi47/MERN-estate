import React from "react";
import CountUp from "react-countup";



export default function Experience() {
  return (
    <div className="relative flex flex-wrap justify-center items-center gap-6 lg:gap-0 lg:h-[500px]">
      {/* Top */}
      <div className="bg-white p-6 rounded-2xl shadow-md shadow-stone-300 transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs w-full text-center text-slate-700 lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2">
        <h1 className="text-4xl font-bold">
          <CountUp end={25} duration={2} suffix="+" />
        </h1>
        <p className="text-xl mt-2 font-medium">years of experience</p>
      </div>

      {/* Left */}
      <div className="bg-white p-6 rounded-2xl shadow-md shadow-stone-300 transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs w-full text-center text-slate-700 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
        <h1 className="text-4xl font-bold">
          <CountUp end={15000} duration={2} suffix="+" />
        </h1>
        <p className="text-xl mt-2 font-medium">jobs created</p>
      </div>

      {/* Right */}
      <div className="bg-white p-6 rounded-2xl shadow-md shadow-stone-300 transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs w-full text-center text-slate-700 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2">
        <h1 className="text-4xl font-bold">
          <CountUp end={8} duration={2} suffix="+" />
        </h1>
        <p className="text-xl mt-2 font-medium">business ventures</p>
      </div>

      {/* Bottom */}
      <div className="bg-white p-6 rounded-2xl shadow-md shadow-stone-300 transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs w-full text-center text-slate-700 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
        <h1 className="text-4xl font-bold">
          <CountUp end={5000} duration={2} suffix="+" />
        </h1>
        <p className="text-xl mt-2 font-medium">happy customers</p>
      </div>

      {/* Center */}
      <div className="bg-slate-400 p-10 rounded-full shadow-xl text-center text-white font-bold text-2xl lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 hover:scale-105 transition-transform duration-300">
        CORE
      </div>
    </div>
  );
}
