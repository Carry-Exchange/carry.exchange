import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiDownload,
  FiFileText,
  FiArrowLeft,
  FiMail,
  FiCheck,
} from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDownloadItem, getDownloadImageUrl, getDownloadFileUrl, PB_URL } from "../lib/pb";
import { formatDate } from "../utils/formatDate";

const defaultGradient = "from-purple-950 to-indigo-950";

function DocumentThumbnail({ item, large = false }) {
  const imageUrl = getDownloadImageUrl(item);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${
        large ? "w-full h-64 sm:h-80" : "w-full h-48"
      }`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${defaultGradient} flex items-center justify-center`}
        >
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_11px)]" />
          <FiFileText
            className={`text-white/70 ${large ? "w-24 h-24" : "w-16 h-16"}`}
          />
        </div>
      )}
      <div className="absolute bottom-4 right-4">
        <span className="text-white/60 text-xs font-mono uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">
          PDF
        </span>
      </div>
    </div>
  );
}

export default function DownloadItem() {
  const { uuid } = useParams();

  const [item, setItem] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [step, setStep] = useState("detail"); // detail | email | success
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getDownloadItem(uuid)
      .then(setItem)
      .catch(() => setNotFound(true))
      .finally(() => setLoadingItem(false));
  }, [uuid]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return showError("Enter a valid email address");
    setLoading(true);
    try {
      const res = await fetch(`${PB_URL}/api/downloads/send-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          document_id: item.id,
          document_title: item.title,
          pdf_url: getDownloadFileUrl(item),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send link");
      setStep("success");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingItem) {
    return (
      <div className="min-h-screen bg-dark-900 text-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-72 bg-gray-800" />
            <div className="p-8 space-y-4">
              <div className="h-4 bg-gray-800 rounded w-1/4" />
              <div className="h-6 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-full" />
              <div className="h-12 bg-gray-800 rounded-xl mt-6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-gray-400 mb-4">
            This download link is invalid or has expired.
          </p>
          <Link
            to="/case-study"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>{item.title} — Carry Exchange Downloads</title>
        <meta name="description" content={item.description} />
      </Helmet>

      <Header />

      <main className="max-w-2xl mx-auto px-4 py-16">
        <Link
          to="/case-study"
          className="inline-flex mt-10 items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors mb-10"
        >
          <FiArrowLeft className="w-4 h-4" />
          All Case Studies
        </Link>

        {/* ─── Detail / Email view ─── */}
        {(step === "detail" || step === "email") && (
          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
            <DocumentThumbnail item={item} large />

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {(item.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full border text-purple-400 border-purple-500/30 bg-purple-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-xl font-medium text-white mt-2 mb-2 leading-snug">
                {item.title}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-1">
                {item.description}
              </p>
              <p className="text-gray-600 text-xs mb-6">
                {formatDate(item.date)}
              </p>

              {step === "detail" && (
                <button
                  onClick={() => setStep("email")}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all text-white font-medium"
                >
                  <FiDownload className="w-4 h-4" />
                  Download PDF
                </button>
              )}

              {step === "email" && (
                <form onSubmit={handleSendLink} className="space-y-3">
                  <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-purple-400" />
                    Enter your email to receive the download link
                  </p>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Download Link"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("detail")}
                      className="px-4 py-3 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ─── Success view ─── */}
        {step === "success" && (
          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
            <DocumentThumbnail item={item} large />
            <div className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">
                Check your inbox
              </h2>
              <p className="text-gray-400 text-sm">
                Download link for{" "}
                <span className="text-white">{item.title}</span> has been sent
                to <span className="text-white">{email}</span>.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
