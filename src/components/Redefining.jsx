import React from "react";
import redefiningWebp from "../assets/redefining.png";

const Redefining = () => {
  return (
    <div className=" flex items-center justify-center px-4 py-24 bg-dark-900 text-white border-b border-gray-800">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Building the Global Market for a New Age Commodity
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            And connecting to traditional commodity derivatives
          </p>
        </div>
        <img
          src={redefiningWebp}
          alt="Carry Exchange platform dashboard showing commodity trading interface"
          className="w-full rounded-3xl shadow-xl"
          loading="lazy"
          decoding="async"
          width="2800"
          height="1358"
        />
      </div>
    </div>
  );
};

export default Redefining;
