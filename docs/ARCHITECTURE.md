# 🏛️ VaultAI System Architecture

VaultAI is structured as a modern, high-performance web application designed for financial monitoring and AI-driven portfolio management.

## 🏗️ 1. Core Component Hierarchy

### 🛸 App Shell (`src/App.jsx`)
The root layout orchestrator. It manages:
- **Navigation**: Sidebar interaction and route switching.
- **Global UI State**: Sidebar hover/collapse logic and AI status visibility.
- **Animations**: Page transition wrappers using `framer-motion`.

### 🧠 Intelligence Layer (`src/services/mlEngine.js`)
The "brain" of the application. It provides:
- **Predictive Modeling**: Generating portfolio trajectories and market sentiment.
- **Risk Calculations**: Real-time volatility and stochastic assessment.
- **Allocation Optimization**: Algorithmic suggestion of target asset weights.

### 🍱 Page Components (`src/pages/`)
- **Dashboard**: High-level overview of portfolio value and AI rebalancing actions.
- **Markets**: Real-time feed of assets with AI-augmented yield and risk scores.
- **Portfolio**: Deep dive into allocation targets and historical automation logs.
- **Watchlist**: Sentiment-driven asset monitoring and price alerts.
- **Profile/Settings**: Configuration of AI explainability, bio-auth, and system modes.

---

## 🚦 2. Data & Communication Flow

1.  **Market Data Feed**: The application fetches live valuation and trend data from `http://localhost:8080/api/markets`.
2.  **ML Enrichment**: Fresh data is passed through the `mlEngine` to append confidence scores and risk assessments.
3.  **Reactive UI**: Component-level `useEffect` hooks trigger re-renders when data updates, ensuring the glass panels reflect the latest system state.
4.  **Action Dispatch**: User actions (e.g., "Rebalance Now") trigger simulated or live execution calls back to the backend layer.

---

## 🎨 3. UI/UX Design System (`src/index.css`)

### Glassmorphism v2
- **Backdrop Filters**: Heavy blurs (`12px`) combined with high-transparency backgrounds.
- **Radiant Effects**: Use of `box-shadow: var(--card-glow)` for depth and `linear-gradient` for premium button interactivity.
- **Adaptive Layouts**: A grid-based system that reorganizes panels based on content density.

---

## ⚙️ 4. Tech Stack Overview
- **Orchestration**: Vite 8 + React 19
- **Animations**: Framer Motion 12
- **Visualization**: Recharts 2.x
- **Icons**: Lucide React
- **Standard**: Semantic HTML5 & Modern CSS3 CSS-Variables
