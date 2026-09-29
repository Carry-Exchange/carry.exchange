import { useState, useEffect } from "react";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { joinWaitlist, getReferrerName } from "../lib/pb";

const WaitlistModal = () => {
  const { isOpen, closeModal, referralCode, setReferralCode } =
    useWaitlistModal();
  const [email, setEmail] = useState("");
  const [localRef, setLocalRef] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Sync referral code from context (URL param) into local state + fetch referrer name
  useEffect(() => {
    if (referralCode) {
      setLocalRef(referralCode);
      getReferrerName(referralCode).then((name) => setReferrerName(name || ""));
    }
  }, [referralCode]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await joinWaitlist(email, localRef);
      setMessage({
        type: "success",
        text: "Successfully joined the waitlist!",
      });
      setEmail("");
      setLocalRef("");
      setTimeout(() => {
        setMessage({ type: "", text: "" });
        // closeModal();
      }, 1500);
    } catch (err) {
      console.error("Waitlist error:", err);
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Please try again.",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="mb-6">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Early Access
          </span>
          <h2
            id="waitlist-modal-title"
            className="text-2xl font-bold text-white mb-2"
          >
            Join the Waitlist
          </h2>
          {referrerName ? (
            <p className="text-gray-400 text-sm">
              You were invited by{" "}
              <span className="text-purple-400 font-medium">{referrerName}</span>
            </p>
          ) : (
            <p className="text-gray-400 text-sm">
              Be among the first to experience the future of commodity trading.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label htmlFor="waitlist-ref" className="sr-only">
              Referral code (optional)
            </label>
            <input
              id="waitlist-ref"
              type="text"
              placeholder="Referral code (optional)"
              value={localRef}
              onChange={(e) => !referralCode && setLocalRef(e.target.value.toUpperCase())}
              readOnly={!!referralCode}
              maxLength={6}
              className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm tracking-widest font-mono uppercase ${
                referralCode
                  ? "border-purple-500/50 text-purple-300 cursor-not-allowed opacity-80"
                  : "border-gray-700 focus:border-purple-500"
              }`}
            />
          </div>

          {message.text && (
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
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
                Joining...
              </>
            ) : (
              <>
                Join Waitlist
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
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;
