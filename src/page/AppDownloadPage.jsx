import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";

const androidSteps = [
  {
    title: "Open the Expo Link",
    desc: (
      <>
        Open your Android phone's browser and go to the{" "}
        <a
          href="https://expo.dev/accounts/aaquadrant/projects/Carry/builds/8e8bda90-5bb9-4fda-b982-65ace7d24e53"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
        >
          Carry APK build page
        </a>{" "}
        on Expo.
      </>
    ),
    tag: { label: "Step 1", type: "android" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Download the APK",
    desc: 'On the Expo page, tap the "Download" or "Build" button. The APK file will begin downloading to your device.',
    tag: { label: "Download", type: "android" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Allow Installation from Unknown Sources",
    desc: 'Go to Settings → Security (or Privacy) and enable "Install unknown apps" or "Unknown sources". This is a one-time step required to install APKs outside the Play Store.',
    tag: { label: "Settings required", type: "warning" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Install the APK",
    desc: 'Open your Downloads folder, tap the downloaded APK file, then tap "Install". The installation will complete in 1–2 minutes.',
    tag: { label: "Install", type: "android" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04L2 12c0 5.52 4.28 10.69 10 11.93C17.72 22.69 22 17.52 22 12l-.382-4.016z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Open the App & Start Trading",
    desc: 'Find the "Carry" app icon on your home screen or app drawer. Tap it, connect your wallet, and start trading!',
    tag: { label: "Ready!", type: "android" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Switch to Robinhood Chain Testnet in Your Wallet",
    desc: (
      <>
        In your wallet (e.g. MetaMask), add the network manually using these
        details:
        <div className="mt-3 rounded-xl bg-dark-900/60 border border-purple-500/20 p-3 flex flex-col gap-2 text-xs font-mono">
          {[
            {
              label: "Network Name",
              value: "Robinhood Chain Testnet",
              color: "text-white",
            },
            {
              label: "RPC URL",
              value: "https://rpc.testnet.chain.robinhood.com",
              color: "text-purple-300",
            },
            { label: "Chain ID", value: "46630", color: "text-white" },
            { label: "Currency Symbol", value: "ETH", color: "text-white" },
            {
              label: "Block Explorer",
              value: "explorer.testnet.chain.robinhood.com",
              color: "text-purple-300",
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:gap-2">
              <span className="text-gray-500 sm:w-36 sm:shrink-0">{label}</span>
              <span className={`${color} break-all`}>{value}</span>
            </div>
          ))}
        </div>
      </>
    ),
    tag: { label: "Testnet", type: "testnet" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const iosSteps = [
  {
    title: "Install TestFlight",
    desc: (
      <>
        Download{" "}
        <a
          href="https://apps.apple.com/app/testflight/id899247664"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
        >
          TestFlight
        </a>{" "}
        from the App Store. It's Apple's official beta testing platform — free
        and completely safe.
      </>
    ),
    tag: { label: "App Store", type: "ios" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 8v4l3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Open the Carry Beta Link",
    desc: (
      <>
        Tap this link on your iPhone:{" "}
        <a
          href="https://testflight.apple.com/join/B5NhzmHx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
        >
          testflight.apple.com/join/B5NhzmHx
        </a>
        . It will open TestFlight automatically.
      </>
    ),
    tag: { label: "Public Link", type: "ios" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Tap "Accept" to Join the Beta',
    desc: 'In TestFlight, tap "Accept" on the Carry beta invitation screen. No email or approval needed — it\'s instant.',
    tag: { label: "Accept", type: "ios" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Install the Carry App",
    desc: 'Tap "Install" on the Carry app inside TestFlight. The app will be installed on your iPhone within seconds.',
    tag: { label: "Install", type: "ios" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Open the App & Start Trading",
    desc: 'Tap the "Carry" icon on your home screen, connect your wallet, and enjoy seamless trading!',
    tag: { label: "Ready!", type: "ios" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Switch to Robinhood Chain Testnet in Your Wallet",
    desc: (
      <>
        In your wallet (e.g. MetaMask), add the network manually using these
        details:
        <div className="mt-3 rounded-xl bg-dark-900/60 border border-purple-500/20 p-3 flex flex-col gap-2 text-xs font-mono">
          {[
            {
              label: "Network Name",
              value: "Robinhood Chain Testnet",
              color: "text-white",
            },
            {
              label: "RPC URL",
              value: "https://rpc.testnet.chain.robinhood.com",
              color: "text-purple-300",
            },
            { label: "Chain ID", value: "46630", color: "text-white" },
            { label: "Currency Symbol", value: "ETH", color: "text-white" },
            {
              label: "Block Explorer",
              value: "explorer.testnet.chain.robinhood.com",
              color: "text-purple-300",
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:gap-2">
              <span className="text-gray-500 sm:w-36 sm:shrink-0">{label}</span>
              <span className={`${color} break-all`}>{value}</span>
            </div>
          ))}
        </div>
      </>
    ),
    tag: { label: "Testnet", type: "testnet" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const tagStyles = {
  android: "bg-green-500/10 text-green-400 border border-green-500/20",
  ios: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  testnet: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const AppDownloadPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const platformParam = searchParams.get("platform");
  const [activePlatform, setActivePlatform] = useState(
    platformParam === "android" ? "android" : "ios"
  );

  useEffect(() => {
    if (platformParam === "ios" || platformParam === "android") {
      setActivePlatform(platformParam);
    }
  }, [platformParam]);

  const switchPlatform = (platform) => {
    setActivePlatform(platform);
    setSearchParams({ platform });
  };

  const steps = activePlatform === "android" ? androidSteps : iosSteps;

  return (
    <div className="min-h-screen bg-dark-900 text-white pt-28 pb-16 px-4 flex flex-col items-center">
      <Helmet>
        <title>Download the Carry Exchange Mobile App</title>
        <meta
          name="description"
          content="Download the Carry Exchange mobile app for iOS and Android. Trade commodities, track markets, and manage your portfolio on the go."
        />
        <link rel="canonical" href="https://carry.exchange/download" />
        <meta
          property="og:title"
          content="Download Carry Mobile App | Carry Exchange"
        />
        <meta
          property="og:description"
          content="Trade commodities on the go with the Carry Exchange mobile app for iOS and Android."
        />
        <meta property="og:url" content="https://carry.exchange/download" />
      </Helmet>
      <Header />

      {/* Header */}
      <div className=" mb-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
            Beta Testing
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
          Download the Carry Exchange Mobile App
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Select your os below and follow the step-by-step guide to install
          carry app on your device.
        </p>
      </div>

      {/* Quick Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-lg">
        <a
          href="https://testflight.apple.com/join/B5NhzmHx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-2xl transition-all shadow-lg font-semibold text-white text-base"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28C16.19 20.28 15.44 19.81 14.58 19.28C13.63 18.7 12.62 18.08 11.41 18.08C10.14 18.08 9.07 18.73 8.08 19.33C7.38 19.76 6.72 20.17 5.99 20.28C5.24 20.39 4.49 20.06 3.81 19.39C2.36 17.94 1.5 15.51 1.5 12.97C1.5 9.51 3.31 7.69 5.99 7.69C7.03 7.69 7.97 8.12 8.82 8.52C9.45 8.81 10.03 9.08 10.53 9.08C10.91 9.08 11.43 8.86 12.02 8.61C12.97 8.22 14.12 7.75 15.39 7.75C16.29 7.75 17.13 7.96 17.87 8.36C18.29 8.59 18.67 8.88 19 9.23L18.29 9.94C18.03 9.64 17.73 9.39 17.39 9.2C16.79 8.87 16.11 8.7 15.39 8.7C14.29 8.7 13.29 9.12 12.39 9.49C11.73 9.76 11.14 10 10.53 10C9.86 10 9.17 9.68 8.42 9.33C7.63 8.96 6.77 8.64 5.99 8.64C3.86 8.64 2.45 10.05 2.45 12.97C2.45 15.27 3.23 17.51 4.53 18.81C5.07 19.35 5.62 19.58 6.14 19.5C6.67 19.41 7.21 19.06 7.83 18.68C8.89 18.04 10.06 17.13 11.41 17.13C12.82 17.13 13.94 17.8 14.96 18.42C15.75 18.92 16.47 19.33 17.05 19.33C17.49 19.33 17.88 19.15 18.29 18.82C18.94 18.29 19.41 17.48 19.64 16.53H20.6C20.35 17.68 19.79 18.67 18.98 19.33C18.42 19.84 17.76 20.28 17.05 20.28Z" />
            <path d="M15.39 3.75C14.49 3.75 13.31 4.33 12.47 5.27C11.71 6.12 11.14 7.36 11.35 8.64C12.53 8.71 13.68 8.08 14.51 7.15C15.28 6.29 15.92 5.03 15.72 3.75H15.39Z" />
          </svg>
          Download for iOS
        </a>
        <a
          href="https://expo.dev/accounts/aaquadrant/projects/Carry/builds/8e8bda90-5bb9-4fda-b982-65ace7d24e53"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-surface-light border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 rounded-2xl transition-all font-semibold text-white text-base"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18C6 18.55 6.45 19 7 19H8V21.5C8 22.33 8.67 23 9.5 23C10.33 23 11 22.33 11 21.5V19H13V21.5C13 22.33 13.67 23 14.5 23C15.33 23 16 22.33 16 21.5V19H17C17.55 19 18 18.55 18 18V8H6V18ZM3.5 8C2.67 8 2 8.67 2 9.5V16.5C2 17.33 2.67 18 3.5 18C4.33 18 5 17.33 5 16.5V9.5C5 8.67 4.33 8 3.5 8ZM20.5 8C19.67 8 19 8.67 19 9.5V16.5C19 17.33 19.67 18 20.5 18C21.33 18 22 17.33 22 16.5V9.5C22 8.67 21.33 8 20.5 8ZM15.53 2.16L16.83.86c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0L14.64 1.63C13.85 1.23 12.95 1 12 1c-.95 0-1.85.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.97 3.26 6 5 6 7h12c0-2-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
          </svg>
          Download for Android
        </a>
      </div>

      {/* Divider */}
      <div className="w-full max-w-lg flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-white text-xs font-medium uppercase tracking-widest">
          Step-by-step guide
        </span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-0 bg-surface-dark border border-purple-500/20 rounded-2xl p-1 mb-10">
        <button
          onClick={() => switchPlatform("ios")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activePlatform === "ios"
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-glow-purple"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28C16.19 20.28 15.44 19.81 14.58 19.28C13.63 18.7 12.62 18.08 11.41 18.08C10.14 18.08 9.07 18.73 8.08 19.33C7.38 19.76 6.72 20.17 5.99 20.28C5.24 20.39 4.49 20.06 3.81 19.39C2.36 17.94 1.5 15.51 1.5 12.97C1.5 9.51 3.31 7.69 5.99 7.69C7.03 7.69 7.97 8.12 8.82 8.52C9.45 8.81 10.03 9.08 10.53 9.08C10.91 9.08 11.43 8.86 12.02 8.61C12.97 8.22 14.12 7.75 15.39 7.75C16.29 7.75 17.13 7.96 17.87 8.36C18.29 8.59 18.67 8.88 19 9.23L18.29 9.94C18.03 9.64 17.73 9.39 17.39 9.2C16.79 8.87 16.11 8.7 15.39 8.7C14.29 8.7 13.29 9.12 12.39 9.49C11.73 9.76 11.14 10 10.53 10C9.86 10 9.17 9.68 8.42 9.33C7.63 8.96 6.77 8.64 5.99 8.64C3.86 8.64 2.45 10.05 2.45 12.97C2.45 15.27 3.23 17.51 4.53 18.81C5.07 19.35 5.62 19.58 6.14 19.5C6.67 19.41 7.21 19.06 7.83 18.68C8.89 18.04 10.06 17.13 11.41 17.13C12.82 17.13 13.94 17.8 14.96 18.42C15.75 18.92 16.47 19.33 17.05 19.33C17.49 19.33 17.88 19.15 18.29 18.82C18.94 18.29 19.41 17.48 19.64 16.53H20.6C20.35 17.68 19.79 18.67 18.98 19.33C18.42 19.84 17.76 20.28 17.05 20.28Z" />
            <path d="M15.39 3.75C14.49 3.75 13.31 4.33 12.47 5.27C11.71 6.12 11.14 7.36 11.35 8.64C12.53 8.71 13.68 8.08 14.51 7.15C15.28 6.29 15.92 5.03 15.72 3.75H15.39Z" />
          </svg>
          iOS (TestFlight)
        </button>
        <button
          onClick={() => switchPlatform("android")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activePlatform === "android"
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-glow-purple"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18C6 18.55 6.45 19 7 19H8V21.5C8 22.33 8.67 23 9.5 23C10.33 23 11 22.33 11 21.5V19H13V21.5C13 22.33 13.67 23 14.5 23C15.33 23 16 22.33 16 21.5V19H17C17.55 19 18 18.55 18 18V8H6V18ZM3.5 8C2.67 8 2 8.67 2 9.5V16.5C2 17.33 2.67 18 3.5 18C4.33 18 5 17.33 5 16.5V9.5C5 8.67 4.33 8 3.5 8ZM20.5 8C19.67 8 19 8.67 19 9.5V16.5C19 17.33 19.67 18 20.5 18C21.33 18 22 17.33 22 16.5V9.5C22 8.67 21.33 8 20.5 8ZM15.53 2.16L16.83.86c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0L14.64 1.63C13.85 1.23 12.95 1 12 1c-.95 0-1.85.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.97 3.26 6 5 6 7h12c0-2-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
          </svg>
          Android (APK)
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl" key={activePlatform}>
        {/* Intro Card */}
        <div className="bg-surface-light border border-purple-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              activePlatform === "android"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
            }`}
          >
            {activePlatform === "android" ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18C6 18.55 6.45 19 7 19H8V21.5C8 22.33 8.67 23 9.5 23C10.33 23 11 22.33 11 21.5V19H13V21.5C13 22.33 13.67 23 14.5 23C15.33 23 16 22.33 16 21.5V19H17C17.55 19 18 18.55 18 18V8H6V18ZM3.5 8C2.67 8 2 8.67 2 9.5V16.5C2 17.33 2.67 18 3.5 18C4.33 18 5 17.33 5 16.5V9.5C5 8.67 4.33 8 3.5 8ZM20.5 8C19.67 8 19 8.67 19 9.5V16.5C19 17.33 19.67 18 20.5 18C21.33 18 22 17.33 22 16.5V9.5C22 8.67 21.33 8 20.5 8ZM15.53 2.16L16.83.86c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0L14.64 1.63C13.85 1.23 12.95 1 12 1c-.95 0-1.85.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.97 3.26 6 5 6 7h12c0-2-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28C16.19 20.28 15.44 19.81 14.58 19.28C13.63 18.7 12.62 18.08 11.41 18.08C10.14 18.08 9.07 18.73 8.08 19.33C7.38 19.76 6.72 20.17 5.99 20.28C5.24 20.39 4.49 20.06 3.81 19.39C2.36 17.94 1.5 15.51 1.5 12.97C1.5 9.51 3.31 7.69 5.99 7.69C7.03 7.69 7.97 8.12 8.82 8.52C9.45 8.81 10.03 9.08 10.53 9.08C10.91 9.08 11.43 8.86 12.02 8.61C12.97 8.22 14.12 7.75 15.39 7.75C16.29 7.75 17.13 7.96 17.87 8.36C18.29 8.59 18.67 8.88 19 9.23L18.29 9.94C18.03 9.64 17.73 9.39 17.39 9.2C16.79 8.87 16.11 8.7 15.39 8.7C14.29 8.7 13.29 9.12 12.39 9.49C11.73 9.76 11.14 10 10.53 10C9.86 10 9.17 9.68 8.42 9.33C7.63 8.96 6.77 8.64 5.99 8.64C3.86 8.64 2.45 10.05 2.45 12.97C2.45 15.27 3.23 17.51 4.53 18.81C5.07 19.35 5.62 19.58 6.14 19.5C6.67 19.41 7.21 19.06 7.83 18.68C8.89 18.04 10.06 17.13 11.41 17.13C12.82 17.13 13.94 17.8 14.96 18.42C15.75 18.92 16.47 19.33 17.05 19.33C17.49 19.33 17.88 19.15 18.29 18.82C18.94 18.29 19.41 17.48 19.64 16.53H20.6C20.35 17.68 19.79 18.67 18.98 19.33C18.42 19.84 17.76 20.28 17.05 20.28Z" />
                <path d="M15.39 3.75C14.49 3.75 13.31 4.33 12.47 5.27C11.71 6.12 11.14 7.36 11.35 8.64C12.53 8.71 13.68 8.08 14.51 7.15C15.28 6.29 15.92 5.03 15.72 3.75H15.39Z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {activePlatform === "android"
                ? "Android — Expo APK"
                : "iOS — TestFlight Beta"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              {activePlatform === "android"
                ? "Carry is not yet on the Google Play Store. You can install it directly via Expo by downloading the APK file."
                : "The Carry iOS app is available for beta testing via TestFlight."}
            </p>
            {activePlatform === "android" ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                You must enable "Unknown Sources" before installing the APK
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4m0 4h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Access the beta build
              </div>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-surface-light border border-purple-500/10 hover:border-purple-500/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5 transition-all duration-200 hover:shadow-glow-purple"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm mb-1">
                  {step.title}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  {step.desc}
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                    tagStyles[step.tag.type]
                  }`}
                >
                  {step.tag.label}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center flex-shrink-0 text-purple-500">
                {step.icon}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-surface-light border border-purple-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h4 className="text-white font-bold text-lg mb-1">
              {activePlatform === "android"
                ? "Ready to get the APK?"
                : "Ready to join the beta?"}
            </h4>
            <p className="text-gray-400 text-sm">
              {activePlatform === "android"
                ? "Expo build link and follow the steps above."
                : "Join instantly — no invite needed. Just tap the link and install."}
            </p>
          </div>
          {activePlatform === "android" ? (
            <a
              href="https://expo.dev/accounts/aaquadrant/projects/Carry/builds/8e8bda90-5bb9-4fda-b982-65ace7d24e53"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold transition-all duration-200 whitespace-nowrap"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download APK
            </a>
          ) : (
            <a
              href="https://testflight.apple.com/join/B5NhzmHx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-sm font-bold transition-all duration-200 whitespace-nowrap"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download TestFlight
            </a>
          )}
        </div>

        <p className=" text-xs text-gray-600 mt-8">
          Having trouble? Contact the team at{" "}
          <a
            href="mailto:connect@carry.exchange"
            className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
          >
            connect@carry.exchange
          </a>
        </p>
      </div>
    </div>
  );
};

export default AppDownloadPage;
