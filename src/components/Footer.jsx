import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import c from "../assets/C.png";
import arry from "../assets/arry.png";

const footerLinks = [
  {
    heading: "Trade",
    links: [
      { label: "Mobile Apps", to: "/download" },
      { label: "Perpetual Futures", to: "/perpetual-futures" },
      { label: "Tokenized Spot", to: "/spot" },
      { label: "Prediction Markets", to: "/prediction-markets" },
      { label: "Commodity Options", to: "/options" },
    ],
  },
  {
    heading: "Earn",
    links: [
      { label: "Stake & Earn", to: "/stake" },
      { label: "Provide Liquidity", to: "/liquidity" },
    ],
  },
  {
    heading: "Institutions",
    links: [
      { label: "Carry concierge", to: "/concierge" },
      { label: "OTC", to: "/otc" },
      { label: "Provide Liquidity", to: "/liquidity" },
      { label: "Integrate", to: "/integrate" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Carry", to: "/about" },
      { label: "Blog", to: "/insights" },
      { label: "Insights", to: "/insights" },
      { label: "Social", to: "/about#social" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-dark-900 border-t border-gray-800/50 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h4 className="text-white font-bold text-sm mb-5">
                {section.heading}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors text-sm block py-1.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* <div className="flex items-center gap-3">
            <img
              src={icon}
              alt="Carry"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-bold text-white">Carry</span>
          </div> */}
          <button
            onClick={() => navigate("/")}
            aria-label="Go to Carry Exchange homepage"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src={c}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-12 rounded-xl object-contain"
            />
            <img
              src={arry}
              alt="Carry Exchange"
              loading="lazy"
              className="h-10 -m-2 mt-1/2 rounded-xl object-contain"
            />
            {/* <span className="text-2xl font-bold">Carry</span> */}
          </button>

          <div className="text-gray-400 text-sm text-center">
            © 2026 Carry Exchange. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </Link>
              <a
                href="mailto:connect@carry.exchange"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://x.com/carryexchange"
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://t.me/+GH86MQ5caWIxMjgx"
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://discord.com/invite/a4QWu86FGq"
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800/50">
          <p
            className="text-gray-400 text-xs text-center leading-relaxed"
            role="note"
          >
            Trading derivatives involves substantial risk of loss and is not
            suitable for all investors. Past performance is not indicative of
            future results. Please trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
