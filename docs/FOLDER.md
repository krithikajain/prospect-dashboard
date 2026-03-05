# Folder Structure & Code Reusability Guide

> A complete map of the project directory structure, detailing the purpose of each module and how to leverage shared assets to maintain a clean, reusable codebase.

---

## 🏗️ Root Directory

```text
prospect-dashboard/
├── frontend/                  # React Application (Vite + Tailwind)
│   ├── src/                   # Main source code
│   ├── docs/                  # Project documentation (Rules, Folder Map, etc.)
│   └── ...                    # Configuration files (Vite, Tailwind, TS, ESLint)
├── backend/                   # FastAPI Orchestrator (Python)
│   ├── main.py                # Server entry point & AI routing
│   └── requirements.txt       # Python dependencies
├── prompts/                   # Repository of LLM system prompts (Plaintext)
└── README.md                  # Project overview
```

---

## 🎨 `frontend/src/` — Application Layer

The frontend is built with a **Feature-First** architecture, keeping business logic local to its domain while sharing generic UI atoms.

```text
src/
├── App.tsx                    # Main entry point & state orchestrator
├── main.tsx                   # React DOM hydration
│
├── config/                    # ⚙️ Global App Configuration
│   └── navigation.ts          # SSoT for Sidebar and Tab structures
│
├── features/                  # 🚀 Business Logic & Stages (Modular)
│   ├── home/                  # Landing page
│   ├── profile/               # Stage 1: Profile Fit
│   ├── power/                 # Stage 2: Power & Stakeholders
│   ├── needs-analysis/        # Stage 4: Pain & Urgency
│   ├── qualification/         # BANT Deep Dives
│   ├── velocity/              # Stage 5: Deal Path
│   └── shared/                # Feature-specific shared components (e.g. PlaceholderView)
│
├── components/                # 🧱 Global UI Shell
│   └── layout/                # DashboardLayout.tsx (The App Frame)
│
├── shared/                    # 🧬 Atomic Design Components
│   ├── components/            # Card, MetricBox, StatusTag, InfoRow, etc.
│   └── layout/                # Navbar, PageHeader, ProfileDropdown
│
├── types/                     # 🏷️ TypeScript Definitions
│   └── dashboard.ts           # The Master Data Contract
│
├── lib/                       # 🛠️ Utilities & Domain Core
│   ├── normalizer.ts          # Transforms raw JSON to DashboardData
│   ├── theme.ts               # Semantic color mapping logic
│   └── domain/                # Pure business logic (Scoring, Evaluations)
│
├── hooks/                     # ⚓ Global React Hooks (usePromptController)
└── data/                      # 💾 Mock Data & Static Stores
```

---

## 🧬 Component Reusability Map

### 1. `shared/components/` (Design System Atoms)
These are raw, generic building blocks. **Do not put business logic here.**

| Component | Purpose | Pros/Usage |
| :--- | :--- | :--- |
| `Card` | Base container for all widgets | Consistent padding and shadow-0 |
| `MetricBox` | Display a label, value, and trend | Perfect for KPIs and financial stats |
| `StatusTag` | Colored pills (High/Med/Low) | Confidence signals and risk levels |
| `InfoRow` | Icon + Title + Value list row | Stakeholder lists, company stats |
| `ScoreDisplay` | Large circular/numeric score | ICP Score, Authority strength |

### 2. `shared/layout/` (Persistent UI)
Components that appear on every screen of the dashboard.

*   **`Navbar.tsx`**: Driven by `config/navigation.ts`. Self-adjusting pill nav.
*   **`PageHeader.tsx`**: Dynamic breadcrumbs and titles.
*   **`ProfileDropdown.tsx`**: User meta-controls.

### 3. `components/layout/` (Structural Framework)
*   **`DashboardLayout.tsx`**: The main "Stage" orchestrator. Encapsulates the sidebar, top header, and the content "glass" pane.

---

## 🚀 How to Add a New Feature

1.  **Define Types**: Update `types/dashboard.ts` if the data contract changed.
2.  **Add Config**: Update `config/navigation.ts` to add the section/tab to the sidebar.
3.  **Feature Folder**: Create `src/features/{feature-name}/`.
    *   `index.ts`: Export the main Stage component.
    *   `{Name}Stage.tsx`: The orchestrator (Grid layout).
    *   `components/`: Local sub-components.
4.  **Register Stage**: Add the component to the `renderStageView` registry in `App.tsx`.
5.  **Normalize**: Update `lib/normalizer.ts` to map raw JSON fields to the new feature.
