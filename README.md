# Carry Exchange — Marketing Website

The official website for [Carry Exchange](https://carry.exchange/), the global derivatives exchange for AI compute, inference, and infrastructure.

## About

Carry Exchange is an AI-native derivatives platform where traders can access Perpetual Futures, Tokenized Spot, and Event Contracts on GPU compute, AI inference, and commodity assets — all on a single unified platform.

## Tech Stack

- **React 19** — UI framework
- **Vite** — build tool & dev server
- **React Router v7** — client-side routing
- **Tailwind CSS** — styling
- **PocketBase** — backend (blog, case studies)
- **PostHog** — product analytics
- **React Helmet Async** — SEO / meta tags
- **HubSpot** — live chat widget

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/perpetual-futures` | Perpetual Futures |
| `/spot` | Tokenized Spot |
| `/prediction-markets` | Prediction Markets |
| `/options` | Commodity Options |
| `/stake` | Stake & Earn |
| `/liquidity` | Provide Liquidity |
| `/concierge` | Carry Concierge |
| `/otc` | OTC Trading |
| `/integrate` | Integrate |
| `/about` | About Us |
| `/insights` | Blog |
| `/insights/:slug` | Blog Post |
| `/case-study` | Case Studies |
| `/download` | App Download |
| `/kol` | KOL Program |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

Or serve the built output:

```bash
npm start   # builds then serves dist/ on port 5173
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Shared UI components (Header, Footer, Banner, etc.)
├── page/           # Route-level page components
├── context/        # React context (WaitlistModal)
├── data/           # Static data (country codes, etc.)
├── lib/            # Third-party client setup (PocketBase)
└── utils/          # Helper utilities (date formatting, tag colors)
```

## Live Links

- Website: https://carry.exchange/
- Trading Terminal: https://terminal.carry.exchange/
