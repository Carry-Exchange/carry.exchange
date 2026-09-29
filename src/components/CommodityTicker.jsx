import React, { useState, useEffect, useMemo } from "react";

const CommodityTicker = () => {
  const [commodities, setCommodities] = useState([]);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const [commodityRes, computeRes] = await Promise.all([
          fetch("https://terminal.carry.exchange/api/v1/assets?category=COMMODITY"),
          fetch("https://api.carry.exchange/api/v1/assets?category=COMPUTE"),
        ]);
        const [commodityData, computeData] = await Promise.all([
          commodityRes.json(),
          computeRes.json(),
        ]);

        const commodityItems = commodityData.items
          .filter((item) => item.subcategory !== "OTHERS")
          .map((item) => ({
            name: item.name,
            change: parseFloat(item.changePct24h),
          }));

        const computeItems = computeData.items.map((item) => ({
          name: item.name,
          change: parseFloat(item.changePct24h),
        }));

        setCommodities([...commodityItems, ...computeItems]);
      } catch (err) {
        console.error("Failed to fetch commodities:", err);
      }
    };

    fetchCommodities();
  }, []);

  const duplicated = useMemo(
    () => [...commodities, ...commodities, ...commodities],
    [commodities]
  );

  if (commodities.length === 0) return null;

  return (
    <div
      className="w-full bg-dark-900 text-white border-y border-gray-800 overflow-hidden py-12"
      role="marquee"
      aria-label="Live commodity prices"
    >
      <div className="relative flex">
        <div
          className="flex animate-scroll-left whitespace-nowrap"
          aria-hidden="true"
        >
          {duplicated.map((commodity, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              <span className="text-gray-400 text-sm font-medium mr-3">
                {commodity.name}
              </span>
              <span
                className={`text-sm font-semibold ${
                  commodity.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {commodity.change >= 0 ? "+" : ""}
                {commodity.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CommodityTicker;
