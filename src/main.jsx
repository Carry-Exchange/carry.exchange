import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import posthog from "posthog-js";
import App from "./App.jsx";
import "./index.css";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  capture_pageview: true,
  capture_pageleave: true,
  loaded: (ph) => {
    ph.register({ $lib: "Carry" });
  },
});

document.addEventListener("click", (e) => {
  const el = e.target.closest("a, button");
  if (!el) return;

  const href = el.getAttribute("href") || el.dataset.href || null;
  const label =
    el.innerText?.trim() ||
    el.getAttribute("aria-label") ||
    el.getAttribute("title") ||
    null;

  posthog.capture("button_clicked", {
    label,
    destination: href,
    element: el.tagName.toLowerCase(),
    opens_new_tab: el.getAttribute("target") === "_blank",
    page: window.location.pathname,
  });
});

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
