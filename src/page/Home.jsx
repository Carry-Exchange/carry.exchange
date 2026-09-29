import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";

const ThreeMarketsSection = lazy(() =>
  import("../components/ThreeMarketSection")
);
const Redefining = lazy(() => import("../components/Redefining"));
const ModernTraderSection = lazy(() =>
  import("../components/ModernTraderSection")
);
const AIOperatesExchange = lazy(() =>
  import("../components/AIOperatesExchange")
);
const CoreMarketArchitecture = lazy(() =>
  import("../components/CoreMarketArchitecture")
);
const CommodityTicker = lazy(() => import("../components/CommodityTicker"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          The Global Derivatives Exchange for AI Compute, Inference &
          Infrastructure
        </title>
        <meta
          name="description"
          content="Hedge processing costs, secure fractional hardware liquidity, and trade tokenized compute resources on an institutional derivatives exchange built for the AI economy. Join 11,000+ traders on the waitlist."
        />
        <link rel="canonical" href="https://carry.exchange/" />
        <meta
          property="og:title"
          content="The Global Derivatives Exchange for AI Compute, Inference & Infrastructure"
        />
        <meta
          property="og:description"
          content="Hedge processing costs, secure fractional hardware liquidity, and trade tokenized compute resources on an institutional derivatives exchange built for the AI economy."
        />
        <meta property="og:url" content="https://carry.exchange/" />
      </Helmet>

      {/* Above fold — loads immediately */}
      <Banner />

      {/* Below fold — lazy loaded as user scrolls */}
      <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
        <ThreeMarketsSection />
        <CoreMarketArchitecture />
        <Redefining />
        <ModernTraderSection />
        {/* <AIOperatesExchange /> */}
        <CommodityTicker />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
