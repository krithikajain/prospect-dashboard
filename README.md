# Prospect Dashboard

A **sales intelligence dashboard** that transforms raw prospect data into actionable insights across multiple analysis stages. Built for sales reps who need to quickly assess prospect fit, authority, budget, pain points, and deal velocity — all in one place.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠 Tech Stack

| Layer          | Technology                                              |
| -------------- | ------------------------------------------------------- |
| **Framework**  | React 19 + TypeScript                                   |
| **Bundler**    | Vite 7                                                  |
| **Styling**    | Tailwind CSS 3.4 + custom CSS                           |
| **Charts**     | Recharts 3.7                                            |
| **Animations** | Framer Motion 12 · GSAP 3.14                            |
| **UI Primitives** | Radix UI (Avatar, Dialog, Tabs, Tooltip, Dropdown…)  |
| **Icons**      | Material Symbols Outlined · Lucide React                |
| **Fonts**      | Inter (Google Fonts)                                    |
| **Forms**      | React Hook Form + Zod validation                        |
| **Utilities**  | clsx · tailwind-merge · class-variance-authority (CVA)  |

---

## 📐 Architecture Overview

The dashboard follows a **stage-based navigation** model:

```
┌─────────────────────────────────────────────────────────┐
│  Navbar  (pill-based section switching)                  │
├─────────────────────────────────────────────────────────┤
│  Folder Tabs  (sub-tabs within a section)               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────────────────────────────────────┐      │
│   │  PageHeader  (breadcrumb + title)            │      │
│   ├──────────────────────────────────────────────┤      │
│   │                                              │      │
│   │  Stage View                                  │      │
│   │  (bento grid of cards)                       │      │
│   │                                              │      │
│   └──────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Navigation Sections

| Section         | Tabs                               | Purpose                                   |
| --------------- | ---------------------------------- | ----------------------------------------- |
| **Home**        | —                                  | Landing / overview                        |
| **Prospect**    | Profile · Power · Pain · Path      | Deep-dive into the prospect entity        |
| **Qualification** | Budget · Authority · Need · Timeline | BANT analysis framework               |
| **Need**        | —                                  | Need analysis (placeholder)               |
| **Proposition** | Timeline                           | Value proposition & timeline              |

### Core Patterns

1. **Orchestrator →  Cards**: Each tab renders a `Stage*` component that acts as a pure layout grid, importing and arranging smaller card components.
2. **Shared UI Primitives**: Repeated patterns (`MetricBox`, `StatusTag`, `InfoRow`, etc.) live in `components/ui/` and are imported everywhere.
3. **Props-down data flow**: `App.tsx` normalizes JSON → passes typed data to stage orchestrators → sub-cards. No global state.
4. **< 100 lines per file**: Every component stays small and focused.

---

## 📂 Project Structure

See [FOLDER.md](./FOLDER.md) for a detailed breakdown of every directory and file.

---

## 🎨 Design System

See [COLORS_UX.md](./COLORS_UX.md) for the full color palette, typography, spacing tokens, and component styling reference.

---

## 📏 Code Rules

See [RULES.md](./RULES.md) for the instructions and conventions followed when generating code for this project.

---

## 📄 Other Docs

| File                                                   | Description                                    |
| ------------------------------------------------------ | ---------------------------------------------- |
| [DASHBOARD_ARCHITECTURE.md](./DASHBOARD_ARCHITECTURE.md) | High-level system design & quick-reference map |
| [FOLDER.md](./FOLDER.md)                               | Full folder tree with reusability notes        |
| [COLORS_UX.md](./COLORS_UX.md)                        | Colors, fonts, and styling tokens              |
| [RULES.md](./RULES.md)                                | Code generation rules & conventions            |

---

## License

Private — internal use only.
