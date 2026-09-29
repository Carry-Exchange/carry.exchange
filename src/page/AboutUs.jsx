import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useWaitlistModal } from "../context/WaitlistModalContext";

const values = [
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
    title: "Accessibility",
    desc: "Making AI & Commodity Markets accessible to everyone, everywhere.",
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
    title: "User-First",
    desc: "Every decision we make starts with our users in mind.",
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
    title: "Global",
    desc: "Building infrastructure that serves traders across all continents.",
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
    title: "Excellence",
    desc: "Striving for the highest standards in everything we do.",
  },
];

const investors = [
  "Sequoia Capital",
  "a16z",
  "Paradigm",
  "Tiger Global",
  "Goldman Sachs",
];

const AboutUs = () => {
  const location = useLocation();
  const { openModal } = useWaitlistModal();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>About Carry | The AI Commodity Derivatives Market</title>
        <meta
          name="description"
          content="Learn about Carry Exchange — our mission to make institutional-grade commodity trading accessible to everyone. Forbes-recognized, FICCI award-winning fintech."
        />
        <link rel="canonical" href="https://carry.exchange/about" />
        <meta
          property="og:title"
          content="About Carry Exchange | AI-Powered Commodity Trading"
        />
        <meta
          property="og:description"
          content="Our mission: bring institutional-grade commodity trading to everyone. Forbes-recognized, FICCI award-winning fintech."
        />
        <meta property="og:url" content="https://carry.exchange/about" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            About
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            About Carry Exchange: Building the AI Commodity Market
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Carry is building the exchange of future. <br />
            An exchange to trade, hedge and speculate on AI derivatives as well
            as traditional commodities. A platform that combines
            institutional-grade infrastructure with consumer-friendly design.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Mission text */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <div className="space-y-5 text-gray-400 text-base leading-relaxed text-justify">
              <p>
                AI is the newest commodity of the world. AI compute and
                inference operate in the fashion of energy commodities of the
                past – Oil & Electricity. However, unlike other commodity
                markets, hyperscalers, data centers and even the users of
                compute have no avenue to hedge their input and output flow.
              </p>
              <p>
                Carry is on a mission to change that by building derivatives
                products on AI computer, inference and GPUs. We connect these
                products with broader commodity derivatives and prediction
                markets at a global scale brining AI and Commodity trading to
                the doorsteps of retail and institutions alike.
              </p>
            </div>
          </div>

          {/* Right — Value cards 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-800 transition-colors"
              >
                <div className="w-11 h-11 bg-purple-900/40 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed text-left">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backed By The Best Section */}
      {/* <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Backed By The Best</h2>
          <p className="text-gray-400 mb-12">
            Trusted by leading investors in fintech and commodities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {investors.map((name, i) => (
              <div
                key={i}
                className="px-6 py-3 border border-gray-700 rounded-xl text-gray-400 text-sm font-medium hover:border-purple-700 hover:text-gray-300 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Social Media Section */}
      <section id="social" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-400">
              Follow us for the latest updates, market insights, and trading
              tips
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="https://x.com/carryexchange"
              target="_blank"
              rel="noreferrer"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-900/40 rounded-2xl flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <FaTwitter className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">Twitter / X</p>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                Follow →
              </span>
            </a>

            {/* <a
              href="#linkedin"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-900/40 rounded-2xl flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <FaLinkedin className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">LinkedIn</p>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                Follow →
              </span>
            </a> */}

            <a
              href="https://t.me/+GH86MQ5caWIxMjgx"
              target="_blank"
              rel="noreferrer"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-900/40 rounded-2xl flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <FaTelegram className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">Telegram</p>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                Follow →
              </span>
            </a>

            <a
              href="https://discord.com/invite/a4QWu86FGq"
              target="_blank"
              rel="noreferrer"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-900/40 rounded-2xl flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <FaDiscord className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">Discord</p>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                Follow →
              </span>
            </a>

            {/* <a
              href="#instagram"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-14 h-14 bg-purple-900/40 rounded-2xl flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <FaInstagram className="w-7 h-7 text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">Instagram</p>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                Follow →
              </span>
            </a> */}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Support</h2>
            <p className="text-gray-400">
              We're here to help — reach out anytime
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <a
              href="mailto:connect@carry.exchange"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex items-start gap-5 hover:border-purple-600 hover:bg-purple-900/10 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600/20 transition-colors">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold mb-1">Email Us</p>
                <p className="text-purple-400 text-sm mb-2">
                  connect@carry.exchange
                </p>
                <p className="text-gray-500 text-sm">
                  For general inquiries, partnerships, and business queries.
                </p>
              </div>
            </a>

            <button
              onClick={() => {
                const hs = window.HubSpotConversations;
                if (hs) {
                  hs.widget.load();
                  hs.widget.open();
                }
              }}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex items-start gap-5 hover:border-purple-600 hover:bg-purple-900/10 transition-all group text-left w-full cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600/20 transition-colors">
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold mb-1">Live Support</p>
                <p className="text-purple-400 text-sm mb-2">Available 24/7</p>
                <p className="text-gray-500 text-sm">
                  In-app live chat support for trading issues and account help.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-950/60 to-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Us on This Journey</h2>
          <p className="text-gray-400 mb-10">
            Be among the first to experience the future of commodity trading.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all shadow-lg font-medium text-white text-lg"
          >
            Join Waitlist
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

export default AboutUs;
