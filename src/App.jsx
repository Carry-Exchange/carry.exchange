import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { WaitlistModalProvider } from "./context/WaitlistModalContext";
const WaitlistModal = lazy(() => import("./components/WaitlistModal"));

const Home = lazy(() => import("./page/Home"));
const TermsAndConditions = lazy(() => import("./page/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./page/PrivacyPolicy"));
const AppDownloadPage = lazy(() => import("./page/AppDownloadPage"));
const PerpetualFutures = lazy(() => import("./page/PerpetualFutures"));
const TokenizedSpot = lazy(() => import("./page/TokenizedSpot"));
const PredictionMarkets = lazy(() => import("./page/PredictionMarkets"));
const CommodityOptions = lazy(() => import("./page/CommodityOptions"));
const StakeEarn = lazy(() => import("./page/StakeEarn"));
const ProvideLiquidity = lazy(() => import("./page/ProvideLiquidity"));
const CarryConcierge = lazy(() => import("./page/CarryConcierge"));
const OTCTrading = lazy(() => import("./page/OTCTrading"));
const Integrate = lazy(() => import("./page/Integrate"));
const AboutUs = lazy(() => import("./page/AboutUs"));
const NotFound = lazy(() => import("./page/NotFound"));
const Kol = lazy(() => import("./page/Kol"));
const DownloadItem = lazy(() => import("./page/DownloadItem"));
const CaseStudy = lazy(() => import("./page/CaseStudy"));
const Blog = lazy(() => import("./page/Blog"));
const BlogPost = lazy(() => import("./page/BlogPost"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const load = () => {
      if (window.HubSpotConversations) {
        window.HubSpotConversations.widget.load();
      }
    };
    if (window.HubSpotConversations) {
      load();
    } else {
      window.hsConversationsOnReady = [load];
    }
  }, []);

  useEffect(() => {
    if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.refresh();
    }
  }, [location.pathname]);

  return (
    <WaitlistModalProvider>
      <Suspense fallback={null}>
        <WaitlistModal />
      </Suspense>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/download" element={<AppDownloadPage />} />
          <Route path="/perpetual-futures" element={<PerpetualFutures />} />
          <Route path="/spot" element={<TokenizedSpot />} />
          <Route path="/prediction-markets" element={<PredictionMarkets />} />
          <Route path="/options" element={<CommodityOptions />} />
          <Route path="/stake" element={<StakeEarn />} />
          <Route path="/liquidity" element={<ProvideLiquidity />} />
          <Route path="/concierge" element={<CarryConcierge />} />
          <Route path="/otc" element={<OTCTrading />} />
          <Route path="/integrate" element={<Integrate />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/insights" element={<Blog />} />
          <Route path="/insights/:slug" element={<BlogPost />} />
          <Route path="/kol" element={<Kol />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/case-study/:uuid" element={<DownloadItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </WaitlistModalProvider>
  );
};

export default App;
