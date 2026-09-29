import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import c from "../assets/C.png";
import arry from "../assets/arry.png";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const menuStructure = {
    Trade: [
      {
        icon: (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        ),
        title: "Desktop Terminal",
        subtitle: "Powerful Trading Experience",
        link: "https://terminal.carry.exchange/",
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        ),
        title: "Mobile Apps",
        subtitle: "Trade on the Go",
        link: "/download",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        ),
        title: "Trade Perps",
        subtitle: "Commodity Perpetual Futures",
        link: "/perpetual-futures",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        ),
        title: "Trade Spot",
        subtitle: "Tokenized Commodity Spot Markets",
        link: "/spot",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        ),
        title: "Trade Prediction Markets",
        subtitle: "Simple Bets on Direction",
        link: "/prediction-markets",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        ),
        title: "Trade Options",
        subtitle: "Commodity Options Strategies",
        link: "/options",
        internal: true,
      },
    ],
    Earn: [
      {
        icon: (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          </div>
        ),
        title: "Stake & Earn",
        subtitle: "Earn upto 22% yield",
        link: "/stake",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        ),
        title: "Provide Liquidity",
        subtitle: "Earn Passive Income",
        link: "/liquidity",
        internal: true,
      },
    ],
    Institutions: [
      {
        icon: (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        ),
        title: "Carry Concierge",
        subtitle: "For Institutional Traders",
        link: "/concierge",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        ),
        title: "Provide Liquidity",
        subtitle: "Earn Handsome Yield",
        link: "/liquidity",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        ),
        title: "OTC",
        subtitle: "Deep Liquidity OTC Markets",
        link: "/otc",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        ),
        title: "Integrate",
        subtitle: "Trade in your platform",
        link: "/integrate",
        internal: true,
      },
    ],
    "Traders' Corner": [
      {
        icon: (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          </div>
        ),
        title: "Portfolio",
        subtitle: "Ledger Balances",
        link: "https://terminal.carry.exchange/portfolio",
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        ),
        title: "Support",
        subtitle: "In a Jam? - Connect",
        link: "/about#support",
        internal: true,
      },
    ],
    About: [
      {
        icon: (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ),
        title: "About Carry",
        subtitle: "Who we are",
        link: "/about",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM13 2v6h6M9 13h6M9 17h4"
              />
            </svg>
          </div>
        ),
        title: "Insights",
        subtitle: "Articles & market commentary",
        link: "/insights",
        internal: true,
      },
      // {
      //   icon: (
      //     <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
      //       <svg
      //         className="w-5 h-5 text-purple-400"
      //         fill="none"
      //         stroke="currentColor"
      //         viewBox="0 0 24 24"
      //       >
      //         <path
      //           strokeLinecap="round"
      //           strokeLinejoin="round"
      //           strokeWidth={2}
      //           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      //         />
      //       </svg>
      //     </div>
      //   ),
      //   title: "Insights",
      //   subtitle: "Commentaries & Coverage",
      //   link: "/insights",
      //   internal: true,
      // },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
        ),
        title: "Social Media",
        subtitle: "Connect with us",
        link: "/about#social",
        internal: true,
      },
      {
        icon: (
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        ),
        title: "Case Studies",
        subtitle: "Real stories from our traders",
        link: "/case-study",
        internal: true,
      },
    ],
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-dark-900 text-white fixed top-0 left-0 right-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              aria-label="Go to Carry Exchange homepage"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src={c}
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                className="h-12 rounded-xl object-contain"
              />
              <img
                src={arry}
                alt="Carry Exchange"
                fetchPriority="high"
                className="h-10 -m-2 mt-1/2 rounded-xl object-contain"
              />
              {/* <span className="text-2xl font-bold">Carry</span> */}
            </button>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {/* Trade Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Trade")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  aria-label="Trade menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Trade"}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                >
                  Trade
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-all duration-200 ${
                      activeDropdown === "Trade" ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>

                {activeDropdown === "Trade" && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                    <div className="bg-surface-light border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[340px]">
                      <div className="p-6 space-y-1">
                        {menuStructure.Trade.map((item, index) =>
                          item.internal ? (
                            <button
                              key={index}
                              onClick={() => {
                                navigate(item.link);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group w-full text-left"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <a
                              key={index}
                              href={item.link}
                              target={
                                item.link.startsWith("http")
                                  ? "_blank"
                                  : "_self"
                              }
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Earn Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Earn")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  aria-label="Earn menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Earn"}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                >
                  Earn
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-all duration-200 ${
                      activeDropdown === "Earn" ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>

                {activeDropdown === "Earn" && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                    <div className="bg-surface-light border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[340px]">
                      <div className="p-6 space-y-1">
                        {menuStructure.Earn.map((item, index) =>
                          item.internal ? (
                            <button
                              key={index}
                              onClick={() => {
                                navigate(item.link);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group w-full text-left"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <a
                              key={index}
                              href="#"
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Institutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Institutions")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  aria-label="Institutions menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Institutions"}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                >
                  Institutions
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-all duration-200 ${
                      activeDropdown === "Institutions"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </button>

                {activeDropdown === "Institutions" && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                    <div className="bg-surface-light border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[340px]">
                      <div className="p-6 space-y-1">
                        {menuStructure.Institutions.map((item, index) =>
                          item.internal ? (
                            <button
                              key={index}
                              onClick={() => {
                                navigate(item.link);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group w-full text-left"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <a
                              key={index}
                              href="#"
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Traders' Corner Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("Traders' Corner")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  aria-label="Traders' Corner menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Traders' Corner"}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                >
                  Traders' Corner
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-all duration-200 ${
                      activeDropdown === "Traders' Corner"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </button>

                {activeDropdown === "Traders' Corner" && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                    <div className="bg-surface-light border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[340px]">
                      <div className="p-6 space-y-1">
                        {menuStructure["Traders' Corner"].map((item, index) =>
                          item.internal ? (
                            <button
                              key={index}
                              onClick={() => {
                                navigate(item.link);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group w-full text-left"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <a
                              key={index}
                              href={item.link || "#"}
                              target={
                                item.link?.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                item.link?.startsWith("http")
                                  ? "noreferrer"
                                  : undefined
                              }
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("About")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  aria-label="About menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "About"}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                >
                  About
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-all duration-200 ${
                      activeDropdown === "About" ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>

                {activeDropdown === "About" && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                    <div className="bg-surface-light border border-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[340px]">
                      <div className="p-6 space-y-1">
                        {menuStructure.About.map((item, index) =>
                          item.internal ? (
                            <button
                              key={index}
                              onClick={() => {
                                navigate(item.link);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group w-full text-left"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <a
                              key={index}
                              href={item.link || "#"}
                              target={
                                item.link?.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                item.link?.startsWith("http")
                                  ? "noreferrer"
                                  : undefined
                              }
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors group"
                            >
                              {item.icon}
                              <div className="flex-1">
                                <div className="text-white font-medium mb-0.5 group-hover:text-purple-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {item.subtitle}
                                </div>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate("/download")}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium"
            >
              Mobile App
            </button>
            <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium"
            >
              Desktop Terminal
            </a>
          </div>

          {/* Mobile Launch App + Hamburger */}
          <div className="lg:hidden flex items-center">
            {/* <a
              href="https://terminal.carry.exchange/"
              target="_blank"
              className="lg:hidden mr-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all text-white text-sm font-medium"
            >
              Launch App
            </a> */}
            <Link
              to="/download"
              className="lg:hidden mr-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all text-white text-sm font-medium"
            >
              Launch App
            </Link>
            <button
              className="lg:hidden text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label={showMobileMenu ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu"
            >
              {showMobileMenu ? (
                <FaTimes className="w-6 h-6" aria-hidden="true" />
              ) : (
                <FaBars className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div id="mobile-menu" className="lg:hidden mt-4 pb-4 animate-fadeIn">
            <nav className="flex flex-col gap-4">
              {/* Mobile Trade Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("Trade")}
                  aria-label="Trade menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Trade"}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors py-2"
                >
                  Trade
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "Trade" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "Trade" && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuStructure.Trade.map((item, index) =>
                      item.internal ? (
                        <button
                          key={index}
                          onClick={() => {
                            navigate(item.link);
                            setShowMobileMenu(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href={item.link}
                          target={item.link ? "_blank" : undefined}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Earn Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("Earn")}
                  aria-label="Earn menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Earn"}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors py-2"
                >
                  Earn
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "Earn" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "Earn" && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuStructure.Earn.map((item, index) =>
                      item.internal ? (
                        <button
                          key={index}
                          onClick={() => {
                            navigate(item.link);
                            setShowMobileMenu(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href="#"
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Institutions Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("Institutions")}
                  aria-label="Institutions menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Institutions"}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors py-2"
                >
                  Institutions
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "Institutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "Institutions" && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuStructure.Institutions.map((item, index) =>
                      item.internal ? (
                        <button
                          key={index}
                          onClick={() => {
                            navigate(item.link);
                            setShowMobileMenu(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href="#"
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Traders' Corner Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("Traders' Corner")}
                  aria-label="Traders' Corner menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "Traders' Corner"}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors py-2"
                >
                  Traders' Corner
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "Traders' Corner" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "Traders' Corner" && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuStructure["Traders' Corner"].map((item, index) =>
                      item.internal ? (
                        <button
                          key={index}
                          onClick={() => {
                            navigate(item.link);
                            setShowMobileMenu(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href={item.link || "#"}
                          target={
                            item.link?.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.link?.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile About Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("About")}
                  aria-label="About menu"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "About"}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors py-2"
                >
                  About
                  <FaChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "About" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "About" && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuStructure.About.map((item, index) =>
                      item.internal ? (
                        <button
                          key={index}
                          onClick={() => {
                            navigate(item.link);
                            setShowMobileMenu(false);
                            setActiveDropdown(null);
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href={item.link || "#"}
                          target={
                            item.link?.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.link?.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {item.icon}
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.subtitle}
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Launch App Button */}
              {/* <a
                href="https://terminal.carry.exchange/"
                target="_blank"
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-center"
              >
                Launch App
              </a> */}

              <Link
                to="/download"
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg font-medium text-center"
              >
                Launch App
              </Link>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}

export default Header;
