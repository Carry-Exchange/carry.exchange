import React from "react";
import { FaRobot, FaShieldAlt, FaRoute, FaBrain } from "react-icons/fa";

const ModernTraderSection = () => {
  const features = [
    {
      icon: <FaRobot className="w-6 h-6" />,
      title: "AI Market Making",
      description:
        "Artificial Intelligence trained on billions of trades provide continuous two-sided liquidity across all commodity pairs. The system adjusts spreads in microseconds based on volatility, inventory risk, and market depth.",
    },
    {
      icon: <FaRoute className="w-6 h-6" />,
      title: "Intelligent Order Routing",
      description:
        "Artificial Intelligence algorithms analyze order flow patterns, market microstructure, and liquidity distribution in real-time. Orders are routed not just for speed, but for optimal execution quality, minimizing slippage and market impact.",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Automated Risk Engine",
      description:
        "Portfolio risk calculations using real-time simulations and stress testing. AI monitors thousands of risk factors continuously. Margin requirements, position limits, and credit exposure are optimized algorithmically without manual intervention.",
    },
    {
      icon: <FaBrain className="w-6 h-6" />,
      title: "Predictive Order Matching",
      description:
        "Artificial Intelligence predicts order flow to pre-match compatible orders, reducing latency and improving price discovery. FIFO when optimal, intelligent when better.",
    },
  ];

  return (
    <div className=" flex items-center justify-center px-4 py-24 bg-dark-900 text-white">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            AI Native Trading Infrastructure
          </h2>

          <p className="text-gray-400 text-lg md:text-xl">
            Every component of Carry's exchange is powered by AI—from liquidity
            provision to order execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-700/30 flex items-center justify-center text-purple-500 group-hover:from-purple-600/30 group-hover:to-purple-800/30 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-[18px] font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm text-justify hyphens-auto">
                {feature.description}
              </p>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernTraderSection;
