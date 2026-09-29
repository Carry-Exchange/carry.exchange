import React from "react";
import {
  FaServer,
  FaShieldAlt,
  FaMicrochip,
  FaChartLine,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaServer className="w-6 h-6" />,
    title: "Compute Cost Management",
    description:
      "Protect your operational runway against volatile GPU pricing and demand spikes by locking in fixed compute rates through standardized futures contracts.",
    color: "purple",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Inference Cost Hedging",
    description:
      "Protect your operational runway against volatile API pricing and demand spikes by locking in predictable inference costs for your AI workloads.",
    color: "teal",
  },
  {
    icon: <FaMicrochip className="w-6 h-6" />,
    title: "Datacenter Hardware",
    description:
      "On demand tokenized GPU hardware liquidity and finance for the datacenters, available capital markets yield high providing liquidity to datacenters.",
    color: "orange",
  },
  {
    icon: <FaChartLine className="w-6 h-6" />,
    title: "Picks & Shovels Investing",
    description:
      "Bet on the building blocks of AI. Perpetual futures on energy, base metals, rare earth minerals and tokenized ETFs on AI companies.",
    color: "purple",
  },
];

const colorMap = {
  purple: {
    icon: "bg-purple-500/20 text-purple-400",
    border: "hover:border-purple-500/50",
    glow: "hover:shadow-purple-500/10",
  },
  teal: {
    icon: "bg-teal-500/20 text-teal-400",
    border: "hover:border-teal-500/50",
    glow: "hover:shadow-teal-500/10",
  },
  orange: {
    icon: "bg-orange-500/20 text-orange-400",
    border: "hover:border-orange-500/50",
    glow: "hover:shadow-orange-500/10",
  },
};

const CoreMarketArchitecture = () => {
  return (
    <div className="bg-dark-900 text-white border-b border-gray-800 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Core Market Architecture
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            As artificial intelligence scales globally, compute time has
            transformed from a corporate expense into the world's most valuable
            digital commodity. Carry bridges the gap between raw hardware
            capacity and sophisticated capital markets.
          </p>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Hedge processing costs, secure fractional hardware liquidity, and
            trade tokenized compute resources on an institutional derivatives
            exchange built for the AI economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const c = colorMap[card.color];
            return (
              <div
                key={index}
                className={`bg-gray-900/50 border border-gray-800 ${c.border} ${c.glow} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg backdrop-blur-sm`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.icon} mb-5`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoreMarketArchitecture;
