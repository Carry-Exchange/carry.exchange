import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiDownload, FiFileText } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDownloads } from "../lib/pb";

const defaultGradient = "from-purple-950 to-indigo-950";

const categoryColors = {
  "Market Research": "text-purple-400 border-purple-500/30 bg-purple-500/10",
  "Trading Guide": "text-blue-400 border-blue-500/30 bg-blue-500/10",
  "Risk Management": "text-red-400 border-red-500/30 bg-red-500/10",
  "DeFi Report": "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  "Commodities Analysis": "text-amber-400 border-amber-500/30 bg-amber-500/10",
  "Options Strategy": "text-green-400 border-green-500/30 bg-green-500/10",
  Regulatory: "text-teal-400 border-teal-500/30 bg-teal-500/10",
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function DownloadCard({ item }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)] group flex flex-col">
      <div
        className={`relative h-44 bg-gradient-to-br ${defaultGradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_11px)]" />
        <FiFileText className="w-16 h-16 text-white/70 group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute bottom-3 right-3">
          <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
            PDF
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              categoryColors[item.category] ||
              "text-gray-400 border-gray-700 bg-gray-800/40"
            }`}
          >
            {item.category}
          </span>
          <span className="text-gray-500 text-xs shrink-0">
            {formatDate(item.date)}
          </span>
        </div>

        <h3 className="text-white font-medium text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {item.title}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        <Link
          to={`/downloads/${item.id}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all text-white text-sm font-medium"
        >
          <FiDownload className="w-4 h-4" />
          Download
        </Link>
      </div>
    </div>
  );
}

export default function Downloads() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDownloads()
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Downloads — Carry Exchange</title>
        <meta
          name="description"
          content="Download research reports, trading guides, and market analysis from Carry Exchange."
        />
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 mt-10 py-1 rounded-full mb-4">
            Resource Library
          </span>
          <h1 className="text-3xl font-light text-white mb-3">Downloads</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Research reports, trading guides, and market analysis curated by the
            Carry Exchange team.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-44 bg-gray-800" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-9 bg-gray-800 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-sm">Failed to load downloads. Please try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <DownloadCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
