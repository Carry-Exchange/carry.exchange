import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchAssets } from "../lib/pb";

const commodities = [
  {
    symbol: "H100",
    marketSymbol: "H100",
    name: "H100 GPU",
    ticker: "tH100",
    price: "$26,750.00",
    backing: "Physical Hardware",
    backingColor: "text-green-400",
    minInvestment: "$50",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"
        />
      </svg>
    ),
    color: "from-green-500 to-green-700",
  },
  {
    symbol: "H200",
    marketSymbol: "H200",
    name: "H200 GPU",
    ticker: "tH200",
    price: "$38,200.00",
    backing: "Physical Hardware",
    backingColor: "text-green-400",
    minInvestment: "$50",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"
        />
      </svg>
    ),
    color: "from-teal-500 to-teal-700",
  },
  {
    symbol: "SEMI",
    marketSymbol: "SMH",
    priceKey: "semi",
    priceSource: "ETF",
    name: "Semiconductor ETF",
    ticker: "tSEMI",
    price: "$242.18",
    backing: "ETF Shares",
    backingColor: "text-blue-400",
    minInvestment: "$10",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
    color: "from-blue-500 to-blue-700",
  },
  {
    symbol: "OIL",
    marketSymbol: "BRENT",
    priceKey: "oil",
    priceSource: "ETF",
    name: "Oil ETF",
    ticker: "tOIL",
    price: "$76.34",
    backing: "ETF Shares",
    backingColor: "text-blue-400",
    minInvestment: "$10",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    color: "from-slate-500 to-slate-700",
  },
  {
    symbol: "GAS",
    marketSymbol: "NG",
    priceKey: "gas",
    priceSource: "ETF",
    name: "Natural Gas ETF",
    ticker: "tGAS",
    price: "$14.62",
    backing: "ETF Shares",
    backingColor: "text-blue-400",
    minInvestment: "$10",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
      </svg>
    ),
    color: "from-orange-500 to-orange-700",
  },
  {
    symbol: "GOLD",
    marketSymbol: "XAU",
    priceKey: "gold",
    priceSource: "COMMODITY",
    name: "Gold",
    ticker: "tGOLD",
    price: "$2,331.50",
    backing: "100% Physical",
    backingColor: "text-green-400",
    minInvestment: "$10",
    icon: (
      <svg
        className="w-5 h-5 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "from-yellow-500 to-yellow-700",
  },
];

const benefits = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
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
    title: "Fully Backed",
    desc: "Every token is backed 1:1 by datacenter assets or physical commodities stored in insured vaults and warehouses.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Trade Globally",
    desc: "Trade anytime, from anywhere with instant settlement.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
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
    title: "Instant Settlement",
    desc: "No T+2 waiting. Your trades settle instantly on our platform.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Fractional Ownership",
    desc: "Own as little as $10 worth of GPU, Uranium, Gold or other commodities.",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose Commodity",
    desc: "Select from GPU, Uranium, Gold, and more.",
  },
  {
    num: "02",
    title: "Buy Tokens",
    desc: "Purchase any amount starting from $10.",
  },
  {
    num: "03",
    title: "Own Real Assets",
    desc: "Your tokens represent real GPUs/physical commodities.",
  },
  {
    num: "04",
    title: "Trade or Redeem",
    desc: "Sell anytime or redeem for physical delivery.",
  },
];

const TokenizedSpot = () => {
  const [livePrices, setLivePrices] = useState({});

  useEffect(() => {
    const fmt = (n) =>
      "$" +
      parseFloat(n).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    Promise.all([
      fetchAssets("ETF"),
      fetchAssets("COMMODITY", { terminal: true }),
    ]).then(([etfItems, commodityItems]) => {
      const allItems = [...etfItems, ...commodityItems];
      const prices = {};
      commodities.forEach((c) => {
        if (!c.priceKey) return;
        const match = allItems.find(
          (i) =>
            i.name?.toLowerCase().includes(c.priceKey) ||
            i.symbol?.toLowerCase().includes(c.priceKey)
        );
        if (match?.lastPrice) prices[c.symbol] = fmt(match.lastPrice);
      });
      setLivePrices(prices);
    });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Tokenized Spot Trading: GPU & Hardware | Carry Exchange</title>
        <meta
          name="description"
          content="Own fractional shares of physical commodities — gold, silver, oil, and more. Every token backed by real assets stored in secure, insured facilities."
        />
        <link rel="canonical" href="https://carry.exchange/spot" />
        <meta
          property="og:title"
          content="Tokenized Commodity Spot Trading | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Own fractional units of GPUs, Physical Commodities and Miner Equity. Every token backed by real assets."
        />
        <meta property="og:url" content="https://carry.exchange/spot" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Trade
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Tokenized Spot Trading for Datacenter Hardware
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Own fractional units of GPUs, Physical Commodities and ETFs. <br />{" "}
            Every unit is backed by real assets stored in secure and insured
            facilities worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white"
            >
              Start Investing
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
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-600 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all font-medium text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Tokenized Commodities Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tokenized Commodities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commodities.map((c, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${c.color} rounded-xl flex items-center justify-center`}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold">{c.name}</div>
                    <div className="text-gray-500 text-xs">{c.ticker}</div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-mono">{livePrices[c.symbol] ?? c.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Backing</span>
                    <span className={`font-medium ${c.backingColor}`}>
                      {c.backing}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Min. Investment</span>
                    <span className="text-white">{c.minInvestment}</span>
                  </div>
                </div>

                {/* Buy Button */}
                <a
                  href={`https://terminal.carry.exchange/trade?market=${c.marketSymbol}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-colors text-center"
                >
                  Buy {c.ticker}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tokenized Commodities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Why Tokenized Exposure?</h2>
          <p className="text-gray-400 mb-14">
            The benefits of physical ownership without the hassle of storage and
            logistics
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-left hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-5">
                  {b.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Building Your Portfolio
          </h2>
          <p className="text-gray-400 mb-10">
            Own real commodities with just a few clicks. No storage hassle, no
            minimum lot sizes.
          </p>
          <a
            href="https://terminal.carry.exchange/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg"
          >
            Get Started
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

export default TokenizedSpot;
