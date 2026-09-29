import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stats = [
  { value: "$900M+", label: "Assets Under Custody" },
  { value: "10+", label: "Institutional Partnerships" },
  { value: "99.99%", label: "Platform Uptime" },
  { value: "<1ms", label: "Execution Latency" },
];

const solutions = [
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
    title: "Advanced Trading",
    desc: "Access to advanced order types, algorithmic trading, and direct market access.",
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
    title: "Prime Custody",
    desc: "Institutional-grade custody with multi-sig security and insurance coverage.",
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
    title: "Deep Liquidity",
    desc: "AI powered liquidity engine making low slippage trades possible 24*7 ",
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
    title: "Dedicated Support",
    desc: "24/7 dedicated account management and technical support team.",
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
    title: "Credit Facilities",
    desc: "Flexible margin and credit lines tailored to your trading needs.",
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
    title: "Global Access",
    desc: " Trade 50+ AI & commodity markets - from any part of the world.",
  },
];

const checkItems = [
  "SOC 2 Type II certified infrastructure",
  "Enterprise SSO and access controls",
  "Custom reporting and analytics",
  "Dedicated account management",
  "SLA-backed service guarantees",
];

const CarryConcierge = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Institutional Concierge Services | Carry Exchange</title>
        <meta
          name="description"
          content="Dedicated institutional trading services with custom solutions, advanced order types, and direct market access for professional commodity traders."
        />
        <link rel="canonical" href="https://carry.exchange/concierge" />
        <meta
          property="og:title"
          content="Carry Concierge — Institutional Trading | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Dedicated institutional trading services with custom solutions for professional commodity traders."
        />
        <meta property="og:url" content="https://carry.exchange/concierge" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Institutions
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Institutional Concierge Services for AI Derivatives
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Enterprise-grade infrastructure for institutional AI Derivatives
            trading. <br /> Advanced execution, custody, and financing
            solutions.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="mailto:institutions@carry.exchange"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-base"
            >
              Contact Sales
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
              Download Overview
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-purple-400">
                  {s.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Solutions</h2>
            <p className="text-gray-400">
              Everything institutional traders need to access global AI
              Derivatives and other commodity markets
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-7 hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-5">
                  {s.icon}
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

      {/* Built for Institutions + Schedule Demo */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — checklist */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Built for Institutions</h2>
            <ul className="space-y-4">
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Schedule Demo card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-3">
              Schedule a Demo
            </h3>
            <p className="text-gray-400 text-sm mb-7 leading-relaxed">
              Learn how Carry Prime can transform your commodity trading
              operations.
            </p>
            <a
              href="mailto:institutions@carry.exchange"
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-base"
            >
              Request Demo
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-10">
            Connect with our institutional team to discuss your requirements.
          </p>
          <a
            href="mailto:institutions@carry.exchange"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg"
          >
            Contact Sales
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

export default CarryConcierge;
