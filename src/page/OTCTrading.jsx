import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stats = [
  { value: "$50B+", label: "Monthly OTC Volume" },
  { value: "500+", label: "Active Counterparties" },
  { value: "<5min", label: "Average Quote Time" },
  { value: "24/7", label: "Global Coverage" },
];

const features = [
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    ),
    title: "Deep Liquidity",
    desc: "Access to deep liquidity vaults for large block trades without market impact.",
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Price Certainty",
    desc: "Lock in guaranteed prices for your entire order, no slippage.",
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
    title: "24/7 Trading",
    desc: "Trade large blocks any time with our global OTC desk coverage.",
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Confidential",
    desc: "Discreet execution without revealing your trading intentions to the market.",
  },
];

const markets = [
  {
    category: "AI",
    min: "Min: $500K",
    items: ["H100 GPU", "H200 GPU"],
  },
  {
    category: "AI Infra",
    min: "Min: $150K",
    items: ["Copper", "Aluminum", "Zinc", "Nickel"],
  },
  {
    category: "Energy",
    min: "Min: $250K",
    items: ["Crude Oil", "Natural Gas", "Heating Oil", "Gasoline"],
  },
  {
    category: "Precious Metals",
    min: "Min: $100K",
    items: ["Gold", "Silver", "Platinum", "Palladium"],
  },
];

const steps = [
  {
    num: "01",
    title: "Submit RFQ",
    desc: "Send your request for quote via our platform or directly to your dealer.",
  },
  {
    num: "02",
    title: "Receive Quote",
    desc: "Get a competitive quote within minutes, valid for immediate execution.",
  },
  {
    num: "03",
    title: "Execute Trade",
    desc: "Accept the quote to execute your trade at the guaranteed price.",
  },
  {
    num: "04",
    title: "Settlement",
    desc: "Same-day or T+1 settlement with secure custody transfer.",
  },
];

const OTCTrading = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Institutional OTC Compute Trading | Carry Exchange</title>
        <meta
          name="description"
          content="Large block OTC commodity trades with deep liquidity, same-day settlement, and 500+ active counterparties. $50B+ monthly OTC volume on Carry Exchange."
        />
        <link rel="canonical" href="https://carry.exchange/otc" />
        <meta
          property="og:title"
          content="OTC Commodity Trading | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Large block OTC commodity trades with deep liquidity and same-day settlement."
        />
        <meta property="og:url" content="https://carry.exchange/otc" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Institutions
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            OTC Trading for High-Volume Compute &amp; AI Resources
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Execute large commodity trades with deep liquidity, guaranteed
            pricing, and complete confidentiality. <br /> Our OTC desk handles
            orders from $100K to $100M+.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="mailto:institutions@carry.exchange"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-base"
            >
              Request Quote
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
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-gray-600 hover:border-purple-500 rounded-xl transition-all font-medium text-gray-300 hover:text-white text-base">
              Learn More
            </button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-purple-400">
                  {s.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Why OTC Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Why OTC?</h2>
            <p className="text-gray-400">
              The preferred choice for institutions executing large commodity
              orders
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-7 hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Markets Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Available Markets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((m, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                <h3 className="text-white font-bold text-base mb-3">
                  {m.category}
                </h3>
                <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-2 py-0.5 rounded-full mb-4">
                  {m.min}
                </span>
                <ul className="space-y-2">
                  {m.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold text-purple-900 mb-4">
                  {s.num}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Trade OTC?</h2>
          <p className="text-gray-400 mb-10">
            Connect with our OTC desk for competitive quotes on large commodity
            orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:institutions@carry.exchange"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg"
            >
              Request Quote
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
            <button className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border border-gray-600 hover:border-purple-500 rounded-xl transition-all font-medium text-gray-300 hover:text-white text-lg">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Live Chat
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OTCTrading;
