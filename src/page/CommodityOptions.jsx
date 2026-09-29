import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const optionsData = {
  Gold: {
    title: "Gold Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$2,647.80",
    change: "+$11.85 (+0.45%)",
    positive: true,
    rows: [
      {
        callBid: "$52.40",
        callAsk: "$53.20",
        strike: "$2,549",
        putBid: "$8.60",
        putAsk: "$9.20",
        atm: false,
      },
      {
        callBid: "$38.80",
        callAsk: "$39.60",
        strike: "$2,625",
        putBid: "$12.40",
        putAsk: "$13.00",
        atm: false,
      },
      {
        callBid: "$27.20",
        callAsk: "$28.00",
        strike: "$2,650",
        putBid: "$18.60",
        putAsk: "$19.40",
        atm: false,
      },
      {
        callBid: "$18.40",
        callAsk: "$19.20",
        strike: "$2,675",
        putBid: "$27.80",
        putAsk: "$28.60",
        atm: true,
      },
      {
        callBid: "$12.00",
        callAsk: "$12.80",
        strike: "$2,700",
        putBid: "$39.20",
        putAsk: "$40.00",
        atm: false,
      },
    ],
  },
  Silver: {
    title: "Silver Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$31.42",
    change: "+$0.38 (+1.22%)",
    positive: true,
    rows: [
      {
        callBid: "$2.10",
        callAsk: "$2.30",
        strike: "$29.00",
        putBid: "$0.45",
        putAsk: "$0.55",
        atm: false,
      },
      {
        callBid: "$1.60",
        callAsk: "$1.75",
        strike: "$30.00",
        putBid: "$0.80",
        putAsk: "$0.95",
        atm: false,
      },
      {
        callBid: "$1.10",
        callAsk: "$1.25",
        strike: "$31.00",
        putBid: "$1.30",
        putAsk: "$1.45",
        atm: true,
      },
      {
        callBid: "$0.75",
        callAsk: "$0.88",
        strike: "$32.00",
        putBid: "$1.90",
        putAsk: "$2.10",
        atm: false,
      },
      {
        callBid: "$0.45",
        callAsk: "$0.58",
        strike: "$33.00",
        putBid: "$2.60",
        putAsk: "$2.80",
        atm: false,
      },
    ],
  },
  "Crude Oil": {
    title: "Crude Oil Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$78.52",
    change: "-$0.65 (-0.82%)",
    positive: false,
    rows: [
      {
        callBid: "$5.20",
        callAsk: "$5.50",
        strike: "$74.00",
        putBid: "$1.10",
        putAsk: "$1.30",
        atm: false,
      },
      {
        callBid: "$3.80",
        callAsk: "$4.10",
        strike: "$76.00",
        putBid: "$1.90",
        putAsk: "$2.10",
        atm: false,
      },
      {
        callBid: "$2.60",
        callAsk: "$2.80",
        strike: "$78.00",
        putBid: "$2.80",
        putAsk: "$3.00",
        atm: true,
      },
      {
        callBid: "$1.70",
        callAsk: "$1.90",
        strike: "$80.00",
        putBid: "$3.90",
        putAsk: "$4.20",
        atm: false,
      },
      {
        callBid: "$1.00",
        callAsk: "$1.20",
        strike: "$82.00",
        putBid: "$5.20",
        putAsk: "$5.50",
        atm: false,
      },
    ],
  },
  "Natural Gas": {
    title: "Natural Gas Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$2.18",
    change: "+$0.05 (+2.34%)",
    positive: true,
    rows: [
      {
        callBid: "$0.28",
        callAsk: "$0.32",
        strike: "$1.90",
        putBid: "$0.04",
        putAsk: "$0.06",
        atm: false,
      },
      {
        callBid: "$0.18",
        callAsk: "$0.22",
        strike: "$2.00",
        putBid: "$0.08",
        putAsk: "$0.11",
        atm: false,
      },
      {
        callBid: "$0.10",
        callAsk: "$0.13",
        strike: "$2.10",
        putBid: "$0.14",
        putAsk: "$0.18",
        atm: true,
      },
      {
        callBid: "$0.05",
        callAsk: "$0.08",
        strike: "$2.20",
        putBid: "$0.22",
        putAsk: "$0.26",
        atm: false,
      },
      {
        callBid: "$0.02",
        callAsk: "$0.04",
        strike: "$2.30",
        putBid: "$0.32",
        putAsk: "$0.36",
        atm: false,
      },
    ],
  },
  Copper: {
    title: "Copper Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$4.21",
    change: "-$0.01 (-0.24%)",
    positive: false,
    rows: [
      {
        callBid: "$0.38",
        callAsk: "$0.42",
        strike: "$3.80",
        putBid: "$0.06",
        putAsk: "$0.09",
        atm: false,
      },
      {
        callBid: "$0.26",
        callAsk: "$0.30",
        strike: "$4.00",
        putBid: "$0.12",
        putAsk: "$0.16",
        atm: false,
      },
      {
        callBid: "$0.16",
        callAsk: "$0.20",
        strike: "$4.20",
        putBid: "$0.20",
        putAsk: "$0.25",
        atm: true,
      },
      {
        callBid: "$0.09",
        callAsk: "$0.13",
        strike: "$4.40",
        putBid: "$0.32",
        putAsk: "$0.38",
        atm: false,
      },
      {
        callBid: "$0.04",
        callAsk: "$0.07",
        strike: "$4.60",
        putBid: "$0.48",
        putAsk: "$0.55",
        atm: false,
      },
    ],
  },
  Platinum: {
    title: "Platinum Options",
    expiry: "March 28, 2026 (30 days)",
    price: "$982.60",
    change: "+$9.00 (+0.92%)",
    positive: true,
    rows: [
      {
        callBid: "$28.40",
        callAsk: "$29.60",
        strike: "$920",
        putBid: "$4.20",
        putAsk: "$5.00",
        atm: false,
      },
      {
        callBid: "$20.10",
        callAsk: "$21.20",
        strike: "$950",
        putBid: "$8.60",
        putAsk: "$9.40",
        atm: false,
      },
      {
        callBid: "$13.50",
        callAsk: "$14.40",
        strike: "$980",
        putBid: "$14.20",
        putAsk: "$15.00",
        atm: true,
      },
      {
        callBid: "$8.40",
        callAsk: "$9.20",
        strike: "$1,010",
        putBid: "$22.40",
        putAsk: "$23.60",
        atm: false,
      },
      {
        callBid: "$4.80",
        callAsk: "$5.60",
        strike: "$1,040",
        putBid: "$32.80",
        putAsk: "$34.00",
        atm: false,
      },
    ],
  },
};

const commodities = [
  "Gold",
  "Silver",
  "Crude Oil",
  "Natural Gas",
  "Copper",
  "Platinum",
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
    title: "Hedge Your Portfolio",
    desc: "Protect your commodity positions from adverse price movements with put options.",
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
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    title: "Defined Risk",
    desc: "Know your maximum loss upfront. Never lose more than the premium paid.",
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
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "Leverage Returns",
    desc: "Amplify your market exposure with a fraction of the capital required for spot positions.",
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
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Advanced Strategies",
    desc: "Build complex strategies with spreads, straddles, and strangles.",
  },
];

const strategies = [
  {
    title: "Covered Call",
    risk: "Low Risk",
    riskColor: "border-green-500 text-green-400",
    desc: "Generate income on your existing commodity holdings by selling call options.",
  },
  {
    title: "Protective Put",
    risk: "Low Risk",
    riskColor: "border-green-500 text-green-400",
    desc: "Protect your long position from downside risk by purchasing put options.",
  },
  {
    title: "Long Straddle",
    risk: "Medium Risk",
    riskColor: "border-yellow-500 text-yellow-400",
    desc: "Profit from large price movements in either direction.",
  },
];

const CommodityOptions = () => {
  const [selected, setSelected] = useState("Gold");
  const data = optionsData[selected];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>AI Compute & Base Metal Options | Carry Exchange</title>
        <meta
          name="description"
          content="Trade options on gold, silver, crude oil, and agricultural commodities. Calls, puts, and spreads with AI-powered pricing on Carry Exchange."
        />
        <link rel="canonical" href="https://carry.exchange/options" />
        <meta
          property="og:title"
          content="Commodity Options Trading | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Trade options on gold, silver, crude oil, and agricultural commodities."
        />
        <meta property="og:url" content="https://carry.exchange/options" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Trade
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Options Trading for AI Compute and Base Metals
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Trade calls and puts on Compute, Inference & AI Infra. <br /> Hedge
            your portfolio, speculate on price movements, or generate income
            with flexible option strategies.
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
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-600 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all font-medium text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Options Chain Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Commodity Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {commodities.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selected === c
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                    : "bg-gray-900 text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Options Chain Table */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
            {/* Table Header Info */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <h2 className="text-white font-bold text-lg">{data.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Expiry: {data.expiry}
                </p>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">{data.price}</div>
                <div
                  className={`font-medium text-sm ${
                    data.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {data.change}
                </div>
              </div>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-5 px-6 py-3 bg-gray-900/40">
              <div className="col-span-2 text-center">
                <span className="flex items-center justify-center gap-1.5 text-green-400 font-bold text-sm">
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
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  CALLS
                </span>
              </div>
              <div className="text-center text-white font-bold text-sm">
                Strike
              </div>
              <div className="col-span-2 text-center">
                <span className="flex items-center justify-center gap-1.5 text-red-400 font-bold text-sm">
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
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  PUTS
                </span>
              </div>
            </div>

            {/* Sub-column Headers */}
            <div className="grid grid-cols-5 px-6 py-2 border-b border-gray-800">
              <div className="text-center text-gray-500 text-xs">Bid</div>
              <div className="text-center text-gray-500 text-xs">Ask</div>
              <div className="text-center text-gray-500 text-xs"></div>
              <div className="text-center text-gray-500 text-xs">Bid</div>
              <div className="text-center text-gray-500 text-xs">Ask</div>
            </div>

            {/* Rows */}
            {data.rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-5 px-6 py-4 border-b border-gray-800/50 last:border-0 transition-colors ${
                  row.atm ? "bg-gray-800/40" : "hover:bg-gray-800/20"
                }`}
              >
                <div className="text-center text-green-400 font-mono text-sm">
                  {row.callBid}
                </div>
                <div className="text-center text-green-400 font-mono text-sm">
                  {row.callAsk}
                </div>
                <div
                  className={`text-center font-mono text-sm font-semibold ${
                    row.atm ? "text-white" : "text-gray-500"
                  }`}
                >
                  {row.strike}
                </div>
                <div className="text-center text-red-400 font-mono text-sm">
                  {row.putBid}
                </div>
                <div className="text-center text-red-400 font-mono text-sm">
                  {row.putAsk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trade Options */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Why Trade Options?</h2>
          <p className="text-gray-400 mb-14">
            Flexible instruments for hedging, speculation, and income generation
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

      {/* Popular Strategies */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Popular Strategies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((s, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-white font-bold text-lg">{s.title}</h3>
                </div>
                <span
                  className={`inline-block border text-xs font-semibold px-3 py-1 rounded-full mb-4 ${s.riskColor}`}
                >
                  {s.risk}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
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
          <h2 className="text-4xl font-bold mb-4">Ready to Trade Options?</h2>
          <p className="text-gray-400 mb-10">
            Get started with commodity options trading on the most advanced
            platform.
          </p>
          <a
            href="https://terminal.carry.exchange/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-white text-lg"
          >
            Open Options Account
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

export default CommodityOptions;
