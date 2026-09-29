import React from "react";

const AIOperatesExchange = () => {
  const steps = [
    {
      step: 1,
      title: "Order Received",
      description:
        "Orders enter the sytem via API, FIX protocol, or web interface. AI instantly classifies order type and urgency.",
    },
    {
      step: 2,
      title: "Risk Analysis",
      description:
        "Automated risk engine validates margin, position limits, and credit in microseconds. Portfolio stress tested in real-time.",
    },
    {
      step: 3,
      title: "Route Optimization",
      description:
        "AI Algorithm determines optimal execution path across trading venues considering spread, depth, and historical patterns.",
    },
    {
      step: 4,
      title: "AI Market Making",
      description:
        "Artificial Intelligence provide counterliquidity if needed, adjusting quotes based on inventory, volatility, and orderbook state.",
    },
    {
      step: 5,
      title: "Intelligent Matching",
      description:
        "Predictive engine matches orders with optimal counterparties, minimizing slippage and maximizing fill rate.",
    },
    {
      step: 6,
      title: "Settlement",
      description:
        "Smart contracts execute delivery terms. AI verifies quality specs, pricing, and logistics in real-time facilitating T+0 settlement.",
    },
  ];

  return (
    <div className="flex items-center justify-center px-4 py-24 bg-dark-900 text-white">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How AI Operates the Exchange
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            From order submission to settlement, every step is autonomous and
            optimized by artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                  {item.step}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {item.description}
              </p>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIOperatesExchange;
