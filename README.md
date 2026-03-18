# Trading Platform Dashboard

**T63-6th-sem-project**  
*This Repository contains tasks for our 6th semester mini project. Synopsis hardcopy is submitted and has been signed by our mentor!*

---

## Overview

A fully interactive, dark-themed **Trading Platform Dashboard** built with **React + Vite**, featuring live chart animations, real-time market simulation, and a comprehensive order panel.

## Tech Stack

- **Frontend**: React 19, Vite 8
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (dark theme)

## Features

### 📊 Live Market Chart
- Real-time data simulation via `setInterval` — chart data scrolls continuously every 2 seconds
- Gradient area chart with auto-updating Y-axis range

### 🪙 Asset Switching
- **Tickers row** (DASH, LINK, XRP) with mini line charts — clickable to switch active asset
- **Tab bar** (EUR/USD, Bitcoin, Ethereum, Gold, Oil WTI, Oil Brent) — click to switch charts
- **Cryptocurrency list** on the right panel — click any coin to focus the main chart on that asset

### 💹 Interactive Order Panel
- **Amount stepper** — `−` / `+` buttons with smart step sizes (±5 / ±10 / ±100)
- **Multiplier chips** — x5, x10, x25, x50, x100, x200 — click to select
- **Auto Closing toggle** — slide to enable / disable with an animated toggle switch
- **Live countdown timer** — ticks in real time
- **Buy / Sell** — deduct from account balance with toast notification feedback
- **Exchange** — triggers a balance deduction with success/error toast

### 🔔 Toast Notification System
- Animated slide-up toasts replace `alert()` popups
- Green for success, red for errors — auto-dismiss after 3 seconds

### 💰 Live Balance Tracker
- Balance in the navigation bar updates in real time as you trade

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
