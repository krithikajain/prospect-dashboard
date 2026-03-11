# 📂 Project Structure & Module Guide

This document provides a complete map of the **Prospect Radar** codebase, detailing the purpose of each directory and the role of key architectural modules.

---

## 🏗️ High-Level Root

```text
prospect-dashboard/
├── frontend/                  # React 19 Application (Vite + Tailwind)
│   ├── src/                   # Main source code
│   └── public/                # Static assets
├── backend/                   # FastAPI Orchestrator (Python 3.10+)
│   ├── main.py                # API Entry point & Route definitions
│   ├── features/              # Feature-specific logic (Prompting, Analysis)
│   └── requirements.txt       # Dependencies
├── docs/                      # 📖 Project documentation (Rules, Design, Tree)
├── prompts/                   # 🤖 Standardized LLM Prompt Repository
└── README.md                  # Project overview & Setup guide
```

---

## 🎨 `frontend/src/` — UI Layer

The frontend follows a **Feature-First** architecture combined with a centralized **Contract System** for type-safety across the network.

```text
src/
├── App.tsx                    # Top-level state & Navigation orchestrator
├── main.tsx                   # React DOM Entry
│
├── contracts/                 # 🏷️ Data Contracts (Mirroring Backend Pydantic)
│   ├── base.ts                # Shared types (Identity, Organization, Seller)
│   ├── profile.ts             # Profile tab specific insights
│   └── index.ts               # Global ProspectIntelligence export
│
├── context/                   # 🧠 State Management
│   └── ProspectingContext.tsx # The Single Source of Truth (SSoT)
│
├── features/                  # 🚀 Business Domains (Self-Contained)
│   ├── home/                  # Landing & Stage Transition logic
│   ├── profile/               # Stage 1: Profile Fit & Industry Insights
│   ├── power/                 # Stage 2: Power & Stakeholder Analysis
│   ├── needs-analysis/        # Stage 4: Pain & Urgency
│   └── velocity/              # Stage 5: Deal Path & Ecosystem Fit
│
├── components/                # 🧱 Global UI Shell
│   ├── layout/                # DashboardLayout.tsx & PageHeader.tsx
│   └── ui/                    # Reusable "Atoms" (MetricBox, InfoRow, etc.)
│
├── hooks/                     # ⚓ Functional Logic
│   └── usePromptController.ts # Lazy-loader for LLM API tabs
│
├── lib/                       # 🛠️ Core Utilities
│   ├── theme.ts               # Centralized Design System Tokens
│   └── normalizer.ts          # External data transformation logic
│
└── data/                      # 💾 Static data & Initial states
```

---

## 🐍 `backend/` — Intelligence Layer

The backend uses a modular **Feature-based Routing** system to ensure the AI logic stays organized as tabs are added.

```text
backend/
├── main.py                    # Root FastAPI app & Middleware
├── .env                       # Secrets (API Keys)
│
├── features/                  # 🧠 Intelligence Modules
│   ├── prospect/              # Main Analysis routing
│   │   ├── profile.py         # Profile Prompt Engineering & Models
│   │   └── ...                # Other tab-specific services
│   └── shared/                # Cross-cutting concerns
│       ├── contracts.py       # Pydantic models (SSoT for Data)
│       └── llm_client.py      # LLM Provider wrapper
│
├── config/                    # ⚙️ App Settings
│   └── demo_seller.py         # Static demo environment config
└── venv/                      # Python Virtual Environment
```

---

## 🧬 Architectural Patterns

### 1. The Contract System
We maintain **Mirrored Models** between `backend/features/shared/contracts.py` (Pydantic) and `frontend/src/contracts/*.ts` (TypeScript). This ensures that the LLM's JSON output perfectly maps to the UI's interface with zero runtime transformation errors.

### 2. Feature Orchestration
Each folder in `src/features/` is a mini-app. It contains its own grid layout (the Orchestrator) and a `components/` sub-folder for its specific cards.

### 3. SSoT Context
The `ProspectingContext` is the only source of data for the UI. It provides typed objects that components consume via the `useProspecting()` hook, replacing the old pattern of passing props through 5 levels.

---

## 🚀 How to Add a New Tab

1.  **Define Contract**: Add the new interface to `frontend/src/contracts/` and its matching Pydantic model to the backend.
2.  **Backend Route**: Create a new service in `backend/features/` to handle the prompt logic.
3.  **Frontend Feature**: Create `src/features/{tab-name}/` with an Orchestrator and local components.
4.  **Registration**: Register the new tab in the `App.tsx` navigation config.
