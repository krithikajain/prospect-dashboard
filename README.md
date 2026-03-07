# Prospect Intelligence Dashboard 🚀

A high-performance **Sales Intelligence Dashboard** designed to transform raw prospect data into actionable insights. Built for modern sales teams to assess **ICP Fit, Authority, Pain Points, and Deal Velocity** through an intuitive, stage-based workflow.

---

## 🎨 Features

- **Stage-Based Navigation**: Systematic analysis from initial profile to deal closing.
- **BANT Analysis Workspace**: Dedicated modules for Budget, Authority, Need, and Timeline.
- **Dynamic Visualizations**: Real-time charts for revenue growth and performance trends.
- **Fluid UI/UX**: Ultra-smooth transitions powered by GSAP and Framer Motion.
- **Component-First Architecture**: Modular grid-based layouts using shared UI primitives.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Bundler** | Vite 7 |
| **Styling** | Tailwind CSS 3.4 |
| **Charts** | Recharts 3.7 |
| **Animations** | Framer Motion 12 · GSAP 3.14 |
| **UI Primitives** | Radix UI (Avatar, Dialog, Tooltip, Dropdown) |
| **Icons** | Material Symbols Outlined · Lucide React |

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📐 Architecture

The dashboard implements a **Stage → Tab → Card** hierarchy:

1. **Top Navbar**: Primary section switching (Home, Prospect, Qualification, etc.).
2. **Folder Tabs**: Contextual sub-navigation within a specific analysis stage.
3. **Bento Grid Layout**: Each tab renders a responsive grid of specialized intelligence cards.

### Navigation Map

| Section | Analysis Modules | Purpose |
| :--- | :--- | :--- |
| **Home** | Overview | Pipeline health and recent alerts. |
| **Prospect** | Profile · Power · Pain · Path | Entity deep-dive and stakeholder mapping. |
| **Qualification** | Budget · Authority · Need · Timeline | Detailed BANT framework assessment. |
| **Proposition** | Portfolio · Timeline | Value mapping and closing strategy. |

---

## 📂 Project Structure

- `src/components/layout`: Global navigation and header components.
- `src/components/stages`: Orchestrator components for each major dashboard view.
- `src/components/ui`: Shared, reusable atomic design components (MetricBox, StatusTag).
- `src/lib`: Logic for data normalization and scoring heuristics.
- `src/types`: Centralized TypeScript definitions for data contracts.

---

## 📄 Documentation

| Doc | Description |
| :--- | :--- |
| [ARCHITECTURE.md](./docs/DASHBOARD_ARCHITECTURE.md) | Technical deep-dive into the render logic. |
| [COLORS_UX.md](./docs/COLORS_UX.md) | Design system tokens and styling rules. |
| [RULES.md](./docs/RULES.md) | Code quality and generation standards. |

---

## 📜 License

Private — Internal Development Only.
