# 💎 VaultAI: The Future of Portfolio Intelligence

**VaultAI** is a premium, AI-driven wealth management platform that transforms traditional trading into a fully automated, high-fidelity financial experience. Far beyond a simple dashboard, VaultAI integrates **Predictive Analytics**, **Stochastic Modeling**, and a **Luxury Neon-Glassmorphism UI** to put capital management on auto-pilot.

---

## ✨ Premium UI & UX (Luxury Upgrade)
VaultAI has been meticulously crafted to feel like a high-end fintech application:
- **🌈 Luxury Gradients**: Vibrant 135° gradients (`#06b6d4` to `#3b82f6`) powering primary action buttons.
- **🏮 Radiant Glows**: Subtle `0 0 20px` card shadows and interactive glows for a "top-tier" visual depth.
- **✨ Framer Motion Integration**: Project-wide spring-physics animations (`scale: 1.03`) making every card and panel feel tactile and responsive.
- **❄️ Neon Glassmorphism**: Frosted backdrop-filter blur effects on obsidian backgrounds with consistent 1px glass borders.

---

## 🚀 Key Functional Modules

### 🧠 AI Command Center
- **System Autopilot**: Displays real-time engine status (ACTIVE), strategy (Balanced Growth), and risk metrics.
- **Dynamic AI Logic Engine**: A dedicated suite in Settings allowing users to toggle **Explainability Matrix**, **Transparency Overlays**, and **Risk-Adjusted Rebalancing**.
- **Mode Selector**: Seamlessly switch between **Simulation** and **Live Mode** environments.

### 📈 Predictive Dashboard
- **Future Forecasting**: Interactive charts in `App.jsx` and `Portfolio.jsx` featuring dashed **AI Prediction Lines** for asset performance.
- **Narrative Insights**: AI-generated text explaining the *reasoning* behind specific market movements and recommended trades.
- **Actionable Rebalancing**: One-tap "Rebalance Now" button to align the portfolio with AI-optimized target weights.

### 🧭 Smart Market Explorer
- **Yield & Risk Scanning**: Every market asset is augmented with real-time "AI Yield Est." and "Risk Assessment" flags.
- **Bullish/Bearish Sentiment**: The Watchlist page acts as an AI asset monitor with predictive sentiment scores.
- **Live Lifecycle**: Real-time data fetching from the Node.js backend (`http://localhost:8080/api/markets`).

---

## 🧠 Centralized ML Intelligence
All "AI" behavior is governed by the core **ML Intelligence Engine** (`src/services/mlEngine.js`), simulating complex institutional grade analytics:
- **Portfolio Volatility Modeling**: Calculating aggregate risk scores on a 0-100 scale.
- **Target Weight Optimization**: Algorithmic generation of optimal asset distributions.
- **Market Sentiment Projection**: Real-time confidence scores and trend forecasting for major assets.

---

## 🛠 Tech Stack & Dependencies
- **Frontend Core**: React 19, Vite, React Router 7
- **Motion & UI Logic**: Framer Motion (Spring Physics & Shared Layouts)
- **Data Visualization**: Recharts (Customized with Predicted Area Overlays)
- **Design System**: Vanilla CSS with Glassmorphism Design Tokens
- **Icons**: Lucide React (Fintech Pack)

---

## 📦 Getting Started

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/JatinSaraswat/Vault-Ai-Frontend.git

# Navigate to the project directory
cd Vault-AI

# Install premium dependencies
npm install
```

### 2. Run the Application
```bash
# Start the development server
npm run dev

# Run Build & Lint Verification
npm run lint
```

### 3. Verification Commands
```bash
# Run ML Engine logic validation
npm run validate

# Run Full CI/CD Suite locally
npm run ci
```

---

## 📂 Project Architecture
```text
src/
├── components/   # Modular UI elements (Sidebar, Charts, Cards)
├── pages/        # Main route views (Markets, Portfolio, Settings, Profile)
├── services/     # Centralized ML Logic Engine & API Integrations
├── styles/       # Design System tokens & global layout CSS
└── App.jsx       # Layout orchestrator & Framer Motion routing
```

**VaultAI** is built to showcase the intersection of **High-Fidelity Design** and **Actionable Financial Intelligence**.
