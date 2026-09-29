import { useState, useEffect, useRef, useMemo } from "react";
import { FiCopy, FiCheck, FiLogOut, FiPhone, FiShare2, FiUser, FiChevronDown, FiMail } from "react-icons/fi";
import { FaXTwitter, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { sendOtp, verifyOtp, updateProfile, getReferrals } from "../lib/pb";
import countryCodes from "../data/countryCodes";
import { formatDateIN as formatDate } from "../utils/formatDate";

const SESSION_KEY = "kol_session";

const maskEmail = (email) => {
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}***@${domain}`;
};

export default function Kol() {
  const [step, setStep] = useState("email"); // email | otp | profile | dashboard
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [kolUser, setKolUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    twitter: "",
    contact: "",
    telegram: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check localStorage for existing session
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setKolUser(user);
        setStep("dashboard");
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  // Fetch referrals when dashboard loads
  useEffect(() => {
    if (step === "dashboard" && kolUser?.referral_code) {
      getReferrals(kolUser.referral_code)
        .then(setReferrals)
        .catch(() => {});
    }
  }, [step, kolUser]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return showError("Enter a valid email");
    setLoading(true);
    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return showError("Enter the 6-digit OTP");
    setLoading(true);
    try {
      const user = await verifyOtp(email, otp);
      setKolUser(user);
      if (!user.name) {
        setStep("profile");
      } else {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        setStep("dashboard");
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profile.name.trim()) return showError("Name is required");
    if (!profile.contact.trim()) return showError("Contact number is required");
    setLoading(true);
    try {
      const updated = await updateProfile(kolUser.id, profile);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      setKolUser(updated);
      setStep("dashboard");
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/?ref=${kolUser.referral_code}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setKolUser(null);
    setStep("email");
    setEmail("");
    setOtp("");
    setReferrals([]);
  };

  const filteredCountries = useMemo(
    () =>
      countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
          c.dial.includes(countrySearch)
      ),
    [countrySearch]
  );

  const shareLink = kolUser
    ? `${window.location.origin}/?ref=${kolUser.referral_code}`
    : "";

  const shareMessage = kolUser
    ? `Trade commodity perps/options on @carryexchange — the AI-native commodity exchange!\nSign up with my referral link:\n${window.location.origin}/?ref=${kolUser.referral_code}`
    : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Carry Exchange",
        text: shareMessage,
        url: shareLink,
      });
    } else {
      navigator.clipboard.writeText(shareMessage).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleShareWhatsapp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      "_blank"
    );
  };

  const handleShareTwitter = () => {
    const tweet = `Trade commodity perps/options on @carryexchange — the AI-native commodity exchange!\nSign up with my referral link:\n${shareLink}`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank"
    );
  };

  const handleShareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        shareLink
      )}&text=${encodeURIComponent(shareMessage)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center px-4 py-16">
      {/* Email Step */}
      {step === "email" && (
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KOL Portal
            </span>
            <h1 className="text-2xl font-light text-white mb-2">Sign In</h1>
            <p className="text-gray-400 text-sm">
              Enter your email to receive a one-time password
            </p>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Verify Email
            </span>
            <h1 className="text-2xl font-light text-white mb-2">Enter OTP</h1>
            <p className="text-gray-400 text-sm">
              We sent a 6-digit code to{" "}
              <span className="text-white">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              inputMode="numeric"
              placeholder="6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-center text-lg tracking-widest"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Verifying...
                </>
              ) : (
                "Verify & Sign In"
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Back to email
            </button>
          </form>
        </div>
      )}

      {/* Profile Step */}
      {step === "profile" && (
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              KOL Portal
            </span>
            <h1 className="text-2xl font-light text-white mb-2">
              Complete your profile
            </h1>
            <p className="text-gray-400 text-sm">
              Tell us a bit about yourself to get started
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
              <input
                type="text"
                id="profile-name"
                placeholder=" "
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="peer w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 pt-5 pb-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <label
                htmlFor="profile-name"
                className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-purple-400 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400"
              >
                Full Name *
              </label>
            </div>
            <div className="flex gap-2">
              {/* Country Dropdown */}
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => { setCountryDropdownOpen(!countryDropdownOpen); setCountrySearch(""); }}
                  className="h-full flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-xl px-3 text-white hover:border-purple-500 transition-colors whitespace-nowrap"
                >
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="text-sm text-gray-300">{selectedCountry.dial}</span>
                  <FiChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {countryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-2 border-b border-gray-700">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => { setSelectedCountry(c); setCountryDropdownOpen(false); setCountrySearch(""); }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-800 transition-colors text-left ${selectedCountry.code === c.code ? "text-purple-400" : "text-gray-300"}`}
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.name}</span>
                            <span className="text-gray-500">{c.dial}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="profile-contact"
                  placeholder=" "
                  value={profile.contact}
                  onChange={(e) =>
                    setProfile({ ...profile, contact: e.target.value })
                  }
                  className="peer w-full bg-gray-900 border border-gray-700 rounded-xl px-4 pt-5 pb-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <label
                  htmlFor="profile-contact"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-purple-400 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400"
                >
                  Contact Number *
                </label>
              </div>
            </div>
            <div className="relative">
              <FaXTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
              <input
                type="text"
                id="profile-twitter"
                placeholder=" "
                value={profile.twitter}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    twitter: e.target.value.replace(/^@/, ""),
                  })
                }
                className="peer w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 pt-5 pb-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <label
                htmlFor="profile-twitter"
                className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-purple-400 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400"
              >
                e.g. @carrydex
              </label>
            </div>
            <div className="relative">
              <FaTelegramPlane className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
              <input
                type="text"
                id="profile-telegram"
                placeholder=" "
                value={profile.telegram}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    telegram: e.target.value.replace(/^@/, ""),
                  })
                }
                className="peer w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 pt-5 pb-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <label
                htmlFor="profile-telegram"
                className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-purple-400 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400"
              >
                e.g. @username
              </label>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Saving...
                </>
              ) : (
                "Continue to Dashboard"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Dashboard Step */}
      {step === "dashboard" && kolUser && (
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                KOL Dashboard
              </span>
              <h2 className="text-white text-xl font-medium">{kolUser.name}</h2>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <FiMail className="w-3.5 h-3.5 text-gray-500" />
                  <span>{kolUser.email}</span>
                </div>
                {kolUser.contact && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <FiPhone className="w-3.5 h-3.5 text-gray-500" />
                    <span>{kolUser.contact}</span>
                  </div>
                )}
                {kolUser.twitter && (
                  <a
                    href={`https://x.com/${kolUser.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <FaXTwitter className="w-3.5 h-3.5 text-gray-500" />
                    <span>@{kolUser.twitter}</span>
                  </a>
                )}
                {kolUser.telegram && (
                  <a
                    href={`https://t.me/${kolUser.telegram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTelegram className="w-3.5 h-3.5 text-gray-500" />
                    <span>@{kolUser.telegram}</span>
                  </a>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Referral Code Card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 mb-6">
            <p className="text-gray-400 text-sm mb-1">Your Referral Code</p>
            <span className="text-4xl font-light tracking-widest text-purple-400">
              {kolUser.referral_code}
            </span>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-0 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-gray-400 text-sm truncate">
                {shareLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium text-white text-sm whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Share buttons */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs mb-3">Share via</p>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleShareWhatsapp}
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl transition-all text-white text-sm"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-white text-sm"
                >
                  <FaXTwitter className="w-4 h-4 text-white" />X (Twitter)
                </button>
                <button
                  onClick={handleShareTelegram}
                  className="flex items-center gap-2 px-4 py-2 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 rounded-xl transition-all text-white text-sm"
                >
                  <FaTelegram className="w-4 h-4 text-[#229ED9]" />
                  Telegram
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-all text-white text-sm"
                >
                  <FiShare2 className="w-4 h-4 text-white" />
                  More
                </button>
              </div>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-white font-medium">Referrals</h2>
              <span className="text-purple-400 text-sm font-medium">
                {referrals.length} joined
              </span>
            </div>

            {referrals.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500 text-sm">
                No referrals yet. Share your link to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-right">Joined At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {referrals.map((entry, i) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 text-white text-sm font-mono">
                          {maskEmail(entry.email)}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm text-right">
                          {formatDate(entry.joined_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
