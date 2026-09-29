import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Low Latency",
    desc: "Sub-millisecond response times with co-located servers worldwide.",
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
    title: "Enterprise Security",
    desc: "API keys with IP whitelisting, rate limiting, and request signing.",
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
    title: "FIX & WebSocket",
    desc: "Choose between FIX for simplicity or WebSocket for real-time data.",
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
    title: "99.99% Uptime",
    desc: "Enterprise-grade reliability with redundant infrastructure.",
  },
];

const codeSnippets = {
  Python: `import requests

API_KEY = "your_api_key"
BASE_URL = "https://api.carry.exchange/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Get Gold price
response = requests.get(
    f"{BASE_URL}/ticker/GOLD-USD",
    headers=headers
)
print(response.json())

# Place a limit order
order = {
    "symbol": "GOLD-USD",
    "side": "buy",
    "type": "limit",
    "quantity": 1.5,
    "price": 2640.00
}
response = requests.post(
    f"{BASE_URL}/orders",
    headers=headers,
    json=order
)`,
  Javascript: `const API_KEY = "your_api_key";
const BASE_URL = "https://api.carry.exchange/v1";

const headers = {
  "Authorization": \`Bearer \${API_KEY}\`,
  "Content-Type": "application/json",
};

// Get Gold price
const res = await fetch(\`\${BASE_URL}/ticker/GOLD-USD\`, { headers });
const data = await res.json();
console.log(data);

// Place a limit order
const order = {
  symbol: "GOLD-USD",
  side: "buy",
  type: "limit",
  quantity: 1.5,
  price: 2640.00,
};
const orderRes = await fetch(\`\${BASE_URL}/orders\`, {
  method: "POST",
  headers,
  body: JSON.stringify(order),
});
console.log(await orderRes.json());`,
  Curl: `# Get Gold price
curl -X GET "https://api.carry.exchange/v1/ticker/GOLD-USD" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json"

# Place a limit order
curl -X POST "https://api.carry.exchange/v1/orders" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "GOLD-USD",
    "side": "buy",
    "type": "limit",
    "quantity": 1.5,
    "price": 2640.00
  }'`,
};

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/markets",
    desc: "List all available commodity markets",
  },
  {
    method: "GET",
    path: "/api/v1/ticker/{symbol}",
    desc: "Get real-time price data for a market",
  },
  { method: "POST", path: "/api/v1/orders", desc: "Place a new order" },
  {
    method: "GET",
    path: "/api/v1/orders/{id}",
    desc: "Get order status and details",
  },
  {
    method: "DELETE",
    path: "/api/v1/orders/{id}",
    desc: "Cancel an open order",
  },
  { method: "GET", path: "/api/v1/positions", desc: "List all open positions" },
];

const methodColors = {
  GET: "bg-blue-700 text-blue-100",
  POST: "bg-purple-700 text-purple-100",
  DELETE: "bg-red-700 text-red-100",
};

const plans = [
  {
    tier: "Starter",
    price: "Free",
    features: [
      { label: "Requests", value: "1,000/day" },
      { label: "WebSocket", value: "5 streams" },
      { label: "Support", value: "Community" },
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    tier: "Professional",
    price: "$299/mo",
    features: [
      { label: "Requests", value: "100,000/day" },
      { label: "WebSocket", value: "50 streams" },
      { label: "Support", value: "Email" },
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    features: [
      { label: "Requests", value: "Unlimited" },
      { label: "WebSocket", value: "Unlimited" },
      { label: "Support", value: "Dedicated" },
    ],
    cta: "Contact Sales",
    highlight: true,
  },
];

const Integrate = () => {
  const [activeTab, setActiveTab] = useState("Python");

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Institutional Exchange API & Integration | Carry</title>
        <meta name="description" content="Integrate with Carry Exchange's commodity trading API. REST and WebSocket APIs for market data, order management, and automated trading strategies." />
        <link rel="canonical" href="https://carry.exchange/integrate" />
        <meta property="og:title" content="API Integration | Carry Exchange" />
        <meta property="og:description" content="Integrate with Carry Exchange's commodity trading API for market data and automated trading." />
        <meta property="og:url" content="https://carry.exchange/integrate" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Institutions
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Exchange API &amp; Integration for Institutional Trading Platforms
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Build on top of Carry Exchange. Access real-time market data,
            execute trades, and manage positions programmatically.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-base">
              Get API Keys
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
            </button>
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-gray-600 hover:border-purple-500 rounded-xl transition-all font-medium text-gray-300 hover:text-white text-base">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documentation
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-7 hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      {/* <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Quick Start</h2>

          <div className="flex gap-2 mb-4">
            {Object.keys(codeSnippets).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                    : "bg-[#1a2030] text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8 overflow-x-auto">
            <pre className="text-purple-400 text-sm font-mono leading-relaxed whitespace-pre">
              {codeSnippets[activeTab]}
            </pre>
          </div>
        </div>
      </section> */}

      {/* API Endpoints Section */}
      {/* <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>

          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-800 text-gray-500 text-sm">
              <div className="col-span-2">Method</div>
              <div className="col-span-4">Endpoint</div>
              <div className="col-span-6">Description</div>
            </div>

            {endpoints.map((ep, i) => (
              <div
                key={i}
                className={`${
                  i !== endpoints.length - 1
                    ? "border-b border-gray-800/60"
                    : ""
                } hover:bg-white/5 transition-colors`}
              >
                <div className="sm:hidden px-4 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        methodColors[ep.method]
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-purple-400 font-mono text-sm">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{ep.desc}</p>
                </div>

                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 items-center text-sm">
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        methodColors[ep.method]
                      }`}
                    >
                      {ep.method}
                    </span>
                  </div>
                  <div className="col-span-4 text-purple-400 font-mono">
                    {ep.path}
                  </div>
                  <div className="col-span-6 text-gray-300">{ep.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2030] border border-gray-700 hover:border-purple-500 rounded-xl transition-all font-medium text-gray-300 hover:text-white text-sm">
              View Full API Reference
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
            </button>
          </div>
        </div>
      </section> */}

      {/* API Plans Section */}
      {/* <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">API Plans</h2>
            <p className="text-gray-400">Choose a plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 flex flex-col gap-6 ${
                  plan.highlight
                    ? "bg-purple-950/60 border-2 border-purple-500"
                    : "bg-[#111827] border border-gray-800"
                }`}
              >
                <div>
                  <p className="text-gray-400 text-sm mb-1">{plan.tier}</p>
                  <p className="text-3xl font-bold text-purple-400">
                    {plan.price}
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <span className="text-gray-400">{f.label}</span>
                      <span className="text-gray-300">{f.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      : "bg-[#1e2636] hover:bg-[#252f42] text-white border border-gray-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-gray-400 mb-10">
            Get your API keys and start building on Carry Exchange.
          </p>
          <button className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg">
            Create API Keys
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
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integrate;
