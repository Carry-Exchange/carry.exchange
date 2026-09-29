import React, { useState, useEffect } from "react";
import { fetchAssets } from "../lib/pb";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const markets = [
  {
    symbol: "H100",
    tradeSymbol: "H100",
    name: "H100 GPU",
    ticker: "H100-PERP",
    price: "$26,750.00",
    change: "+1.23%",
    positive: true,
    volume: "$3.2B",
    leverage: "50x",
    color: "from-green-500 to-green-600",
  },
  {
    symbol: "URN",
    tradeSymbol: "URANIUM/USD",
    apiSymbol: "URANIUM",
    apiCategory: "COMMODITY",
    name: "Uranium",
    ticker: "URN-PERP",
    price: "$91.20",
    change: "-0.64%",
    positive: false,
    volume: "$890M",
    leverage: "50x",
    color: "from-lime-500 to-lime-600",
  },
  {
    symbol: "COP",
    tradeSymbol: "COPPER",
    apiSymbol: "COPPER",
    apiCategory: "COMMODITY",
    name: "Copper",
    ticker: "COP-PERP",
    price: "$4.21",
    change: "-0.27%",
    positive: false,
    volume: "$3.5B",
    leverage: "75x",
    color: "from-orange-500 to-orange-600",
  },
  {
    symbol: "XAG",
    tradeSymbol: "XAG",
    apiSymbol: "XAG",
    apiCategory: "COMMODITY",
    name: "Silver",
    ticker: "XAG-PERP",
    price: "$29.34",
    change: "+1.12%",
    positive: true,
    volume: "$4.2B",
    leverage: "100x",
    color: "from-gray-400 to-gray-500",
  },
  {
    symbol: "XAU",
    tradeSymbol: "XAU",
    apiSymbol: "XAU",
    apiCategory: "COMMODITY",
    name: "Gold",
    ticker: "XAU-PERP",
    price: "$2,647.80",
    change: "+0.45%",
    positive: true,
    volume: "$12.4B",
    leverage: "100x",
    color: "from-yellow-500 to-yellow-600",
  },
];

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "No Expiry",
    desc: "Trade perpetual contracts without worrying about expiration dates or contract rollovers.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "Up to 100x Leverage",
    desc: "Maximize your trading potential with industry-leading leverage options.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Advanced Risk Management",
    desc: "Built-in stop-loss, take-profit, and liquidation protection mechanisms.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instant Settlement",
    desc: "Real-time P&L updates and instant margin calculations.",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose Your Market",
    desc: "Select from 50+ AI & Commodity markets including Compute, Inference, Semiconductors, Energy, and ETFs.",
  },
  {
    num: "02",
    title: "Set Your Position",
    desc: "Go long or short with leverage up to 100x. Set your entry price, stop-loss, and take-profit levels.",
  },
  {
    num: "03",
    title: "Manage & Close",
    desc: "Monitor your P&L in real-time. Close positions instantly with deep liquidity vaults.",
  },
];

const fmtPrice = (n) =>
  "$" + parseFloat(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtVolume = (n) => {
  const v = parseFloat(n);
  if (isNaN(v)) return null;
  if (v === 0) return "$0";
  if (v >= 1e9) return "$" + (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(0) + "M";
  if (v >= 1e3) return "$" + (v / 1e3).toFixed(0) + "K";
  return "$" + v.toFixed(0);
};

const fmtChange = (n) => {
  const v = parseFloat(n);
  return (v >= 0 ? "+" : "") + v.toFixed(2) + "%";
};

const PerpetualFutures = () => {
  const [liveData, setLiveData] = useState({});

  useEffect(() => {
    Promise.all([
      fetchAssets("COMPUTE"),
      fetchAssets("COMMODITY", { terminal: true }),
    ]).then(([computeItems, commodityItems]) => {
      const allItems = [...computeItems, ...commodityItems];
      const data = {};
      markets.forEach((m) => {
        if (!m.apiSymbol) return;
        const match = allItems.find(
          (i) =>
            i.symbol?.toUpperCase() === m.apiSymbol.toUpperCase() ||
            i.name?.toLowerCase().includes(m.apiSymbol.toLowerCase())
        );
        if (match) {
          data[m.symbol] = {
            price: match.lastPrice ? fmtPrice(match.lastPrice) : null,
            change: match.changePct24h != null ? fmtChange(match.changePct24h) : null,
            positive: parseFloat(match.changePct24h) >= 0,
            volume: match.volume != null ? fmtVolume(match.volume) : null,
            tradeSymbol: match.marketSymbol || match.symbol || m.tradeSymbol,
          };
        }
      });
      setLiveData(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Trade AI Compute Perpetual Futures | Carry Exchange</title>
        <meta
          name="description"
          content="Trade commodity perpetual futures with no expiry dates. Up to 100x leverage on gold, silver, crude oil, and 50+ markets with AI-powered market making."
        />
        <link rel="canonical" href="https://carry.exchange/perpetual-futures" />
        <meta
          property="og:title"
          content="Perpetual Futures Trading | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Trade commodity perpetual futures with no expiry dates. Up to 100x leverage on gold, silver, crude oil, and 50+ markets."
        />
        <meta
          property="og:url"
          content="https://carry.exchange/perpetual-futures"
        />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Trade
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Trade Perpetual Futures on AI Value Chain
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Trade AI compute, Inference and traditional commodity futures with
            no expiry date. <br /> Leverage up to 100x with deep liquidity and
            tight spreads.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-white"
            >
              Start Trading
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a
              href="#"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-600 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all font-medium text-white"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Available Markets */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Available Markets</h2>
          <div className="rounded-2xl border border-gray-800 overflow-hidden">
            {/* Table Header - desktop only */}
            <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-4 bg-gray-900/60 text-gray-400 text-sm font-medium">
              <div>Market</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h Change</div>
              <div className="text-right">24h Volume</div>
              <div className="text-right">Max Leverage</div>
            </div>

            {/* Market Rows */}
            {markets.map((m, i) => {
              const live = liveData[m.symbol] ?? {};
              const price = live.price ?? m.price;
              const change = live.change ?? m.change;
              const positive = live.change != null ? live.positive : m.positive;
              const volume = live.volume ?? m.volume;
              const tradeSymbol = live.tradeSymbol ?? m.tradeSymbol;
              const tradeUrl = `https://terminal.carry.exchange/trade?market=${tradeSymbol}`;
              return (
              <div
                key={i}
                className="border-t border-gray-800 first:border-t-0 sm:first:border-t hover:bg-gray-800/30 transition-colors"
              >
                {/* Mobile Layout */}
                <div className="sm:hidden px-4 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white text-xs font-bold">
                          {m.symbol}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{m.name}</div>
                        <div className="text-gray-500 text-xs">{m.ticker}</div>
                      </div>
                    </div>
                    <a
                      href={tradeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-xs font-medium text-white"
                    >
                      Trade
                    </a>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-white font-mono font-medium">
                        {price}
                      </div>
                      <div className="text-gray-500 text-xs">Price</div>
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          positive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {change}
                      </div>
                      <div className="text-gray-500 text-xs">24h Change</div>
                    </div>
                    <div>
                      <div className="text-gray-300">{volume}</div>
                      <div className="text-gray-500 text-xs">Volume</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="border border-purple-500 text-purple-400 text-xs font-semibold px-2 py-0.5 rounded-lg">
                      {m.leverage} Max
                    </span>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:grid grid-cols-5 gap-4 items-center px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-xs font-bold">
                        {m.symbol}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{m.name}</div>
                      <div className="text-gray-500 text-xs">{m.ticker}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-white">
                    {price}
                  </div>
                  <div
                    className={`text-right font-medium ${
                      positive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {change}
                  </div>
                  <div className="text-right text-gray-300">{volume}</div>
                  <div className="flex items-center justify-end gap-3">
                    <span className="border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-lg">
                      {m.leverage}
                    </span>
                    <a
                      href={tradeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-sm font-medium text-white"
                    >
                      Trade
                    </a>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Why Trade Perpetual Futures */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">
            Why Trade Perpetual Futures?
          </h2>
          <p className="text-gray-400 mb-14">
            Access global AI derivatives with advanced trading tools designed
            for institutions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-left hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Perpetual Futures Work */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">
            How Perpetual Futures Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-7xl font-bold text-purple-900/60 mb-4">
                  {s.num}
                </span>
                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0a0a0f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-gray-400 mb-10">
            Join thousands of traders on the most advanced commodity trading
            platform.
          </p>
          <a
            href="https://terminal.carry.exchange/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-white text-lg"
          >
            Open Trading Account
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PerpetualFutures;
