# 🛡️ VaultAI Project Policies

## 🔒 1. Security Policy
VaultAI is designed with a "Privacy First" mindset for financial data:
- **Simulation Mode**: By default, the application runs in a sandboxed Simulation Mode to prevent accidental live trade execution during testing.
- **Bio-Auth Simulation**: The "Security & Bio-Auth" settings utilize state-of-the-art UI representations of encrypted access protocols.
- **Data Integrity**: All API calls and sensitive computations are performed using modern JWT-ready patterns (implementation pending backend integration).

## 🕵️ 2. Data Privacy
- **Client-Side Storage**: User preferences and AI explainability toggles are handled locally to ensure minimal data exposure.
- **Anonymized Metrics**: AI rebalancing logs do not store personally identifiable information (PII).

## 🤝 3. Contribution Guidelines
- **Modern Code Standards**: All PRs must pass `npm run lint` and `npm run validate`.
- **Aesthetic Consistency**: New UI components must adhere to the **Neon Glassmorphism** design system defined in `index.css`.
- **Atomic Commits**: We prefer granular, descriptive commits that follow the **Conventional Commits** standard (e.g., `feat:`, `fix:`, `docs:`).

## 🚀 4. Deployment Policy
- **Build Verification**: Every production build should be validated using `npm run ci`.
- **Environment**: Ensure all API endpoints in `src/pages/Markets.jsx` are pointed to the appropriate production staging URI before release.
