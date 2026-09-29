import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiDownload, FiFileText } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDownloads, getDownloadImageUrl } from "../lib/pb";
import { getTagColor } from "../utils/tagColor";
import { formatDate } from "../utils/formatDate";

const defaultGradient = "from-purple-950 to-indigo-950";

function DownloadCard({ item }) {
  const imageUrl = getDownloadImageUrl(item);
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)] group flex flex-col">
      <div className="relative h-44 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${defaultGradient} flex items-center justify-center`}>
            <FiFileText className="w-16 h-16 text-white/70" />
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="text-white/60 text-xs font-mono uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">
            PDF
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {(item.tags || []).map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
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
          to={`/case-study/${item.id}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all text-white text-sm font-medium"
        >
          <FiDownload className="w-4 h-4" />
          Download
        </Link>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDownloads()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Case Studies — Carry Exchange</title>
        <meta
          name="description"
          content="Download research reports, trading guides, and market analysis from Carry Exchange."
        />
        <link rel="canonical" href="https://carry.exchange/case-study" />
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 mt-10 py-1 rounded-full mb-4">
            Resource Library
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Case Studies</h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
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
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-5">
              <FiFileText className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-white text-lg font-medium mb-2">No case studies yet</h2>
            <p className="text-gray-500 text-sm max-w-xs">
              We're working on it. Check back soon for research reports and trading guides.
            </p>
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
