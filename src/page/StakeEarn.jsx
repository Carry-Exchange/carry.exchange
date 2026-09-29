import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TERMINAL_API } from "../lib/pb";

const BASE_VAULT = {
  id: "clp",
  name: "CLP Vault",
  ticker: "CLP",
  lock: "Flexible",
  lockType: "flex",
  minStake: "$100",
};

function formatTVL(raw) {
  const num = parseFloat(raw);
  if (isNaN(num)) return "$—";
  if (num >= 1_000_000) return "$" + (num / 1_000_000).toFixed(2) + "M";
  if (num >= 1_000) return "$" + (num / 1_000).toFixed(1) + "K";
  return "$" + num.toFixed(2);
}

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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Up to 22% APY",
    desc: "Earn competitive yields on your staked commodities with daily compounding.",
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
    title: "Secure Staking",
    desc: "Your assets are secured by institutional-grade custody solutions.",
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
    title: "Flexible Terms",
    desc: "Choose between flexible withdrawal or locked staking for higher yields.",
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
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Auto-Compound",
    desc: "Rewards are automatically compounded to maximize your returns.",
  },
];

const PoolIcon = () => (
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
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const StakeEarn = () => {
  const [vaultStats, setVaultStats] = useState({ apy: 0, tvl: "—", sharePrice: "—" });
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(`${TERMINAL_API}/vault/stats`)
      .then((r) => r.json())
      .then((data) => setVaultStats(data))
      .catch(() => {});
  }, []);

  const vault = { ...BASE_VAULT, apy: vaultStats.apy, tvl: formatTVL(vaultStats.tvl) };

  const earnings = (() => {
    const val = parseFloat(amount);
    if (!val || val <= 0)
      return { daily: "$0.00", monthly: "$0.00", yearly: "$0.00" };
    const daily = (val * vaultStats.apy) / 100 / 365;
    const monthly = daily * 30;
    const yearly = (val * vaultStats.apy) / 100;
    const fmt = (n) => "$" + n.toFixed(2);
    return { daily: fmt(daily), monthly: fmt(monthly), yearly: fmt(yearly) };
  })();

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Stake Assets & Earn AI Economy Yield | Carry Exchange</title>
        <meta
          name="description"
          content="Stake commodities and earn up to 12.4% APY on gold, silver, and energy vaults. Flexible and fixed-term staking on Carry Exchange."
        />
        <link rel="canonical" href="https://carry.exchange/stake" />
        <meta
          property="og:title"
          content="Stake & Earn Rewards | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Stake commodities and earn up to 12.4% APY on gold, silver, and energy vaults."
        />
        <meta property="og:url" content="https://carry.exchange/stake" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Earn
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Stake Your Assets to Earn Yield in the AI Economy
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Put your commodities to work. <br /> Earn passive income by staking
            your tokenized commodities in our secure vaults.
          </p>

          {/* Stats */}
          {/* <div className="flex flex-wrap gap-10">
            <div>
              <div className="text-3xl font-bold text-purple-400">$359M+</div>
              <div className="text-gray-500 text-sm mt-1">
                Total Value Locked
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">12%</div>
              <div className="text-gray-500 text-sm mt-1">Max APY</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">15K+</div>
              <div className="text-gray-500 text-sm mt-1">Active Stakers</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Calculator + Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rewards Calculator */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-white font-bold text-lg">
                Rewards Calculator
              </h2>
            </div>

            {/* Vault Info */}
            <div className="p-3 rounded-xl border border-purple-500 bg-purple-900/20 mb-6">
              <div className="text-white text-sm font-medium">{vault.name}</div>
              <div className="text-purple-400 text-sm font-bold mt-0.5">
                {vault.apy}% APY
              </div>
            </div>

            {/* Amount Input */}
            <p className="text-gray-400 text-sm mb-2">Stake Amount (USD)</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors mb-5 text-sm"
            />

            {/* Earnings */}
            <div className="bg-gray-900/60 rounded-xl divide-y divide-gray-800 mb-6">
              {[
                { label: "Daily Earnings", value: earnings.daily },
                { label: "Monthly Earnings", value: earnings.monthly },
                { label: "Yearly Earnings", value: earnings.yearly },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-gray-300 text-sm">{row.label}</span>
                  <span className="text-green-400 font-bold text-sm font-mono">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Stake Button */}
            <a
              href="https://terminal.carry.exchange/liquidity"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg"
            >
              Stake Now
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

          {/* Feature Cards 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-4">
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

      {/* Staking Vaults Table */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Staking Vaults</h2>
          <div className="rounded-2xl border border-gray-800 overflow-hidden">
            {/* Table Header - desktop only */}
            <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-4 bg-gray-900/60 text-gray-400 text-sm font-medium">
              <div className="col-span-2">Vault</div>
              <div className="text-center">APY</div>
              <div className="text-center">TVL</div>
              <div className="text-center">Lock Period</div>
              <div className="text-right">Min. Stake</div>
            </div>

            {/* Vault Rows */}
            {[vault].map((p, i) => (
              <div
                key={i}
                className="border-t border-gray-800 first:border-t-0 sm:first:border-t hover:bg-gray-800/30 transition-colors"
              >
                {/* Mobile Layout */}
                <div className="sm:hidden px-4 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <PoolIcon />
                      </div>
                      <div>
                        <div className="text-white font-medium">{p.name}</div>
                        <div className="text-gray-500 text-xs">{p.ticker}</div>
                      </div>
                    </div>
                    <a
                      href="https://terminal.carry.exchange/liquidity"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-xs font-medium text-white"
                    >
                      Stake
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-purple-400 font-bold">{p.apy}%</div>
                      <div className="text-gray-500 text-xs">APY</div>
                    </div>
                    <div>
                      <div className="text-gray-300">{p.tvl}</div>
                      <div className="text-gray-500 text-xs">TVL</div>
                    </div>
                    <div>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                          p.lockType === "flex"
                            ? "border-green-500 text-green-400"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {p.lock}
                      </span>
                      <div className="text-gray-500 text-xs mt-1">
                        Lock Period
                      </div>
                    </div>
                    <div>
                      <div className="text-white">{p.minStake}</div>
                      <div className="text-gray-500 text-xs">Min. Stake</div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:grid grid-cols-6 gap-4 items-center px-6 py-5">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PoolIcon />
                    </div>
                    <div>
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-gray-500 text-xs">{p.ticker}</div>
                    </div>
                  </div>
                  <div className="text-center font-bold text-purple-400">
                    {p.apy}%
                  </div>
                  <div className="text-center text-gray-300">{p.tvl}</div>
                  <div className="text-center">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        p.lockType === "flex"
                          ? "border-green-500 text-green-400"
                          : "border-gray-600 text-gray-400"
                      }`}
                    >
                      {p.lock}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-white">{p.minStake}</span>
                    <a
                      href="https://terminal.carry.exchange/liquidity"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all text-sm font-medium text-white"
                    >
                      Stake
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Start Earning Today</h2>
          <p className="text-gray-400 mb-10">
            Put your commodities to work and earn passive income with secure
            staking.
          </p>
          <a
            href="https://terminal.carry.exchange/liquidity"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg"
          >
            Connect Wallet
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

export default StakeEarn;
