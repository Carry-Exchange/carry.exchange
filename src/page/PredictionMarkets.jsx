import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const markets = [
  {
    category: "AI",
    expiry: "Jul 31, 2026",
    question: "GPT-5.6 released by...?",
    yesPercent: 99,
    noPercent: 1,
    volume: "$2M volume",
    traders: "3241 traders",
    yesPrice: "$0.99",
    noPrice: "$0.01",
  },
  {
    category: "AI",
    expiry: "Jul 8, 2026",
    question: "GPT-5.6 released on...?",
    yesPercent: 77,
    noPercent: 23,
    volume: "$259K volume",
    traders: "892 traders",
    yesPrice: "$0.77",
    noPrice: "$0.23",
  },
  {
    category: "Precious Metals",
    expiry: "Jun 30, 2026",
    question: "Will Gold reach $3,000 by Q2 2026?",
    yesPercent: 42,
    noPercent: 58,
    volume: "$2.4M volume",
    traders: "1847 traders",
    yesPrice: "$0.42",
    noPrice: "$0.58",
  },
  {
    category: "Energy",
    expiry: "Dec 31, 2026",
    question: "Will Crude Oil drop below $60 by end of 2026?",
    yesPercent: 28,
    noPercent: 72,
    volume: "$1.8M volume",
    traders: "1234 traders",
    yesPrice: "$0.28",
    noPrice: "$0.72",
  },
  {
    category: "Industrial Metals",
    expiry: "Dec 31, 2026",
    question: "Will Copper hit all-time high in 2026?",
    yesPercent: 65,
    noPercent: 35,
    volume: "$890K volume",
    traders: "892 traders",
    yesPrice: "$0.65",
    noPrice: "$0.35",
  },
  {
    category: "Energy",
    expiry: "Mar 31, 2026",
    question: "Will Natural Gas exceed $5 this winter?",
    yesPercent: 38,
    noPercent: 62,
    volume: "$1.2M volume",
    traders: "1456 traders",
    yesPrice: "$0.38",
    noPrice: "$0.62",
  },
];

const categories = [
  "All",
  "AI",
  "Precious Metals",
  "Energy",
  "Industrial Metals",
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
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "Trade Market Sentiment",
    desc: "Express your views on commodity price movements and market events.",
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Wisdom of the Crowd",
    desc: "Prediction markets aggregate information from thousands of traders.",
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
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: "Win on Accuracy",
    desc: "Profit when your predictions are correct. Simple yes/no outcomes.",
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Real-time Resolution",
    desc: "Markets resolve automatically based on verifiable data feeds.",
  },
];

const categoryBadgeColor = {
  "Precious Metals": "border-purple-500 text-purple-400",
  Energy: "border-purple-500 text-purple-400",
  "Industrial Metals": "border-purple-500 text-purple-400",
};

const PredictionMarkets = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? markets
      : markets.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>AI & Tech Event Prediction Markets | Carry Exchange</title>
        <meta
          name="description"
          content="Trade prediction markets on gold, oil, and agricultural commodities. Bet on price movements with binary outcomes on Carry Exchange."
        />
        <link
          rel="canonical"
          href="https://carry.exchange/prediction-markets"
        />
        <meta
          property="og:title"
          content="Commodity Prediction Markets | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Trade prediction markets on gold, oil, and agricultural commodities."
        />
        <meta
          property="og:url"
          content="https://carry.exchange/prediction-markets"
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
            Prediction Markets for AI and Technology Events
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Trade on commodity price movements and market events. <br /> Put
            your market knowledge to work and earn when you're right.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-white"
            >
              Explore Markets
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

      {/* Markets Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                    : "bg-gray-900 text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Market Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((m, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-semibold border px-3 py-1 rounded-full ${
                      categoryBadgeColor[m.category]
                    }`}
                  >
                    {m.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <svg
                      className="w-3.5 h-3.5"
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
                    {m.expiry}
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-white font-bold text-lg mb-5">
                  {m.question}
                </h3>

                {/* Yes/No Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-green-400 font-medium">
                      Yes {m.yesPercent}%
                    </span>
                    <span className="text-red-400 font-medium">
                      No {m.noPercent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${m.yesPercent}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-gray-500 text-xs mb-5">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
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
                    {m.volume}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {m.traders}
                  </span>
                </div>

                {/* Buy Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors text-sm">
                    Buy Yes {m.yesPrice}
                  </button>
                  <button className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors text-sm">
                    Buy No {m.noPrice}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Prediction Markets */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Why Prediction Markets?</h2>
          <p className="text-gray-400 mb-14">
            A new way to trade on your commodity market insights
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

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Put Your Knowledge to Work
          </h2>
          <p className="text-gray-400 mb-10">
            Join thousands of traders making predictions on global commodity
            markets.
          </p>
          <a
            href="https://terminal.carry.exchange/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-white text-lg"
          >
            Start Trading
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

export default PredictionMarkets;
