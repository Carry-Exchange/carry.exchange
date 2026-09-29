import React, { useState, useEffect } from "react";
import { FaChartBar, FaArrowTrendUp, FaScaleBalanced } from "react-icons/fa6";
import { LuCoins } from "react-icons/lu";

const ThreeMarketsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  const markets = [
    {
      id: 1,
      name: "Perpetual Futures",
      tagline: "Trade Without Expiry",
      description: "Leveraged positions without expiry date.",
      icon: <FaArrowTrendUp className="w-8 h-8" />,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },

    {
      id: 2,
      name: "Tokenized Spot",
      tagline: "Own GPUs and Commodities",
      description: "Fractional ownership of physical assets, backed 1:1.",
      icon: <LuCoins className="w-8 h-8" />,
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: 3,
      name: "Prediction Markets",
      tagline: "Trade Your Insights",
      description:
        "Bet on model releases, price movements, and supply chain outcomes.",
      icon: <FaChartBar className="w-8 h-8" />,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: 4,
      name: "Options",
      tagline: "Hedge Your Bets",
      description:
        "Buy and sell options to manage risk and speculate on price movements.",
      icon: <FaScaleBalanced className="w-8 h-8" />,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  // Auto-animate tabs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % markets.length);
      setProgress(0);
    }, 8000);

    return () => clearInterval(interval);
  }, [markets.length]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / 80; // 40 steps in 4 seconds (100ms each)
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setProgress(0);
  };

  const getButtonClasses = (index) => {
    const baseClasses =
      "px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm min-h-[44px]";

    if (index === activeTab) {
      const colorClasses = {
        0: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50",
        1: "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/50",
        2: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50",
        3: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50",
      };
      return `${baseClasses} ${colorClasses[index]}`;
    }

    return `${baseClasses} bg-transparent border border-gray-700 text-gray-300 hover:border-gray-600`;
  };

  const getCardClasses = (market) => {
    const colorClasses = {
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      teal: "from-teal-500 to-teal-600",
    };

    return `bg-gradient-to-br ${colorClasses[market.color]}`;
  };

  const getTaglineColor = (market) => {
    const colorClasses = {
      purple: "text-purple-400",
      teal: "text-teal-400",
    };

    return colorClasses[market.color];
  };

  return (
    <div className=" bg-dark-900 text-white border-y border-gray-800 flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Many Markets, One Platform
          </h2>
          <p className="text-gray-400 text-lg">
            Every instrument to trade Compute & Commodities Efficiently
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {markets.map((market, index) => (
            <button
              key={market.id}
              onClick={() => handleTabClick(index)}
              className={getButtonClasses(index)}
            >
              {market.name}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="flex items-start gap-6">
              <div
                className={`p-6 rounded-2xl ${getCardClasses(
                  markets[activeTab]
                )} shadow-xl flex-shrink-0`}
              >
                <div className="text-white">{markets[activeTab].icon}</div>
              </div>

              <div className="flex-1">
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                  {markets[activeTab].name}
                </h2>
                <p
                  className={`text-lg font-medium mb-4 ${getTaglineColor(
                    markets[activeTab]
                  )}`}
                >
                  {markets[activeTab].tagline}
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  {markets[activeTab].description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {markets.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                    index === activeTab
                      ? "w-8"
                      : "w-1.5 bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {index === activeTab && (
                    <>
                      <div className="absolute inset-0 bg-gray-700" />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${markets[activeTab].gradient} transition-all duration-100 ease-linear`}
                        style={{ width: `${progress}%` }}
                      />
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeMarketsSection;
