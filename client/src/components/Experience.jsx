import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  const stats = [
    { end: 25, suffix: "+", label: "years of experience" },
    { end: 15000, suffix: "+", label: "jobs created" },
    { end: 8, suffix: "+", label: "business ventures" },
    { end: 5000, suffix: "+", label: "happy customers" },
  ];

  const positions = [
    "lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2",
    "lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2",
    "lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2",
    "lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2",
  ];

  return (
    <div
      ref={ref}
      className="relative flex flex-wrap justify-center items-center gap-6 lg:gap-0 lg:h-[500px]"
    >
      {stats.map((item, i) => (
        <div
          key={i}
          className={`bg-white p-6 rounded-2xl shadow-md shadow-stone-300 transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs w-full text-center text-slate-700 ${positions[i]}`}
        >
          <h1 className="text-4xl font-bold">
            {inView ? (
              <CountUp end={item.end} duration={3} suffix={item.suffix} />
            ) : (
              "0" + item.suffix
            )}
          </h1>
          <p className="text-xl mt-2 font-medium">{item.label}</p>
        </div>
      ))}

      {/* Center */}
      <div className="bg-slate-400 p-15 rounded-full shadow-xl text-center text-white font-bold text-2xl lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 hover:scale-105 transition-transform duration-300">
        CORE
      </div>
    </div>
  );
}
