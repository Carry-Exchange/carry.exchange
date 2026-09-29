import { useEffect, useState } from "react";
import Header from "./Header";

const Banner = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const [commodityRes, computeRes] = await Promise.all([
          fetch(
            "https://terminal.carry.exchange/api/v1/assets?category=COMMODITY"
          ),
          fetch("https://api.carry.exchange/api/v1/assets?category=COMPUTE"),
        ]);
        const [commodityData, computeData] = await Promise.all([
          commodityRes.json(),
          computeRes.json(),
        ]);
        const copper = commodityData.items.find((i) =>
          i.name?.toLowerCase().includes("copper")
        );
        const h100 = computeData.items.find((i) =>
          i.name?.toLowerCase().includes("h100")
        );
        const h200 = computeData.items.find((i) =>
          i.name?.toLowerCase().includes("h200")
        );

        const selected = [h100, h200, copper].filter(Boolean).map((item) => ({
          name: item.name,
          price: parseFloat(item.lastPrice || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          change: parseFloat(item.changePct24h || 0),
          up: parseFloat(item.changePct24h || 0) >= 0,
        }));
        setMarkets(selected);
      } catch (err) {}
    };
    fetchMarkets();
  }, []);

  const displayMarkets =
    markets.length > 0
      ? markets.slice(0, 3)
      : [
          { name: "H100", price: "2,847.50", change: 4.32, up: true },
          { name: "H200", price: "3,120.00", change: -1.05, up: false },
          { name: "Copper", price: "4.52", change: 1.2, up: true },
        ];

  return (
    <div id="hero" className="bg-dark-900 text-white pt-28">
      <Header />

      {/* <div className="flex justify-end mx-5">
        <a
          href="https://terminal.carry.exchange/"
          target="_blank"
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all text-white text-sm font-medium"
        >
          Launch App
        </a>
      </div> */}

      <main
        className="max-w-7xl mx-auto pt-2 lg:pt-12 pb-24"
        aria-label="Hero section"
      >
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-center">
          <div className="space-y-8 lg:mx-0 mx-auto max-w-xl lg:max-w-none text-center lg:text-left">
            <div className="hidden lg:inline-flex items-center gap-3 flex-wrap lg:justify-start justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-purple-500/20">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-purple-400 text-sm font-medium">
                  The Global AI Derivatives Exchange
                </span>
              </div>
            </div>

            <h1>
              <span className="block text-5xl lg:text-[48px] xl:text-[56px] font-bold leading-tight tracking-tight">
                The Global Exchange
              </span>
              <span className="block text-5xl lg:text-[48px] xl:text-[56px] font-bold leading-snug tracking-tight text-shimmer">
                for AI Value Chain
              </span>
            </h1>

            <div className="flex flex-col gap-3">
              <p className="text-lg text-gray-400 leading-relaxed lg:max-w-[510px] text-justify">
                Trade Perpetual Futures, Tokenized Spot, and Event Contracts on
                the first AI-native derivatives exchange.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed lg:max-w-[510px] text-justify">
                GPU Compute, Inference, AI Infra and other value chain assets,
                on a single unified platform.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <a
                href="https://terminal.carry.exchange/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 mt-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-glow-purple inline-flex items-center gap-3"
              >
                <span className="relative flex items-center justify-center w-3 h-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-300" />
                </span>
                Trade Now
              </a>
            </div>
          </div>

          {/* Trading Terminal Card */}
          <div className="hidden lg:block">
            <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <div className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-[#0d0d1a] to-[#110d24] shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800/60">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400" />
                    </span>
                    <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">
                      Live Trading
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {displayMarkets.map((m, idx) => {
                    const bars = m.up
                      ? [3, 5, 4, 6, 5, 7, 6, 8, 7, 9]
                      : [8, 7, 6, 7, 5, 6, 4, 5, 3, 4];
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3 border border-gray-800/40"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-semibold truncate">
                            {m.name}
                          </div>
                          <div className="text-gray-500 text-xs mt-0.5">
                            Carry Exchange
                          </div>
                        </div>
                        <div className="flex items-end gap-0.5 h-7 flex-shrink-0 w-16">
                          {bars.map((h, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-sm ${
                                m.up ? "bg-purple-500/70" : "bg-red-500/50"
                              }`}
                              style={{ height: `${h * 10}%` }}
                            />
                          ))}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-white text-sm font-mono">
                            {m.price}
                          </div>
                          <div
                            className={`text-xs font-medium mt-0.5 ${
                              m.up ? "text-purple-400" : "text-red-400"
                            }`}
                          >
                            {m.up ? "+" : ""}
                            {m.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-800/60 border-t border-gray-800/60">
                  <div className="px-4 py-3 text-center">
                    <div className="text-white font-semibold text-lg">30+</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">
                      Markets
                    </div>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <div className="text-white font-semibold text-lg">24/7</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">
                      Trading
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banner;
