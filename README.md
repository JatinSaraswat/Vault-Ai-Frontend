# VaultAI – AI-Powered Money Management

**T63-6th-sem-project**  
*VaultAI is a premium, AI-driven wealth management platform transformed from a traditional trading dashboard. This project highlights advanced AI interventions, predictive analytics, and a state-of-the-art Neon Glassmorphism UI.*

---

## 🤖 Overview
VaultAI is designed to simplify complex financial management by putting an AI "Auto-Pilot" at the core of the user experience. Instead of manual trading, users interact with AI-driven rebalancing, risk-assessment flags, and narrative insights.

## 🎨 Premium Aesthetics
- **Neon Glassmorphism**: High-contrast neon blue and green accents on a deep obsidian background.
- **Glass Panels**: Backdrop-filter blur effects with consistent 1px borders for a "frosted glass" look.
- **Typography**: Inter for readability and Poppins for professional headings.
- **Animations**: Real-time status pulses and smooth hover transitions.

## 🚀 Key Features

### 🧠 AI Command Center (App Shell)
- **AI Control Panel**: Displays system status (ACTIVE), current strategy (Balanced Growth), and risk tolerance at a glance.
- **Dynamic Expanding Sidebar**: A state-of-the-art navigation shell that expands on hover to reveal labels and brand identity, while staying minimalist in its collapsed state.
- **Explainability & Transparency**: A dedicated "PRO" configuration suite allowing users to toggle real-time logic reasoning, risk matrix breakdowns, and futuristic price overlays.

### 📊 Predictive Dashboard
- **AI Portfolio Chart**: Combines historical data with dashed **AI Prediction Lines** for future performance forecasting.
- **AI Insights Box**: Real-time narrative explanations for why the AI is making specific capital movements.
- **Action Panel**: Simple "Apply/Ignore" interface for AI-recommended rebalances.

### 📈 Smart Portfolio Sector
- **Allocation Targets**: Bars comparing current asset weight against AI-recommended targets.
- **Dynamic Risk Meter**: A color-coded scale (0-100) reflecting real-time portfolio volatility.
- **Activity Log**: Automated record of every AI intervention and optimization.

### 🧭 Smart Market Explorer
- **Yield & Risk Flags**: Markets are augmented with "AI Yield Est." and "Risk Assessment" indicators.
- **Live Backend Integration**: Real-time market data is fetched directly from the backend API (`http://localhost:8080/api/markets`) ensuring current valuation and trend accuracy.
- **Sentiment Monitor**: The Watchlist page acts as an AI asset monitor with bullish/bearish sentiment scores.

## 🧠 Centralized ML Intelligence
All "AI" features are powered by a custom-built **ML Intelligence Engine** (`src/services/mlEngine.js`). This service simulates real-world backend logic for:
- **Aggregate Risk Analysis**: Calculation of portfolio-wide volatility scores.
- **Market Sentiment Projection**: Real-time bullish/bearish forecasting for major assets.
- **Allocation Optimization**: Algorithmic generation of target asset weights.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite 8, React Router 7
- **Visualization**: Recharts (with custom prediction overlays)
- **Icons**: Lucide React
- **Design**: Vanilla CSS with Glassmorphism Utilities

## 📝 Project History
- **Commits**: 50+ individual, descriptive commits for granular tracking and scoring.
- **Verification**: Fully verified cross-page responsiveness and charting stability.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run full CI/CD verification locally (Lint + Build + ML Test)
npm run ci

# Run specific ML logic tests
npm run validate
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
