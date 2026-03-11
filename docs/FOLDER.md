# 📂 Project Structure & Module Guide

This document provides a complete map of the **Prospect Radar** codebase.

---

## 🏗️ High-Level Root

```text
prospect-dashboard/
├── frontend/                  # React 19 Application (Vite + Tailwind)
├── backend/                   # FastAPI Orchestrator (Python 3.10+)
├── prompts/                   # 🤖 Standardized LLM Prompt Repository
│   ├── profile.txt            # System prompt for Tab 1
│   ├── pain.txt               # System prompt for Tab 3
│   ├── power.txt              # System prompt for Tab 2
│   └── path.txt               # System prompt for Tabs 5 & 6
├── docs/                      # 📖 Project documentation
└── README.md                  # Setup & Overview
```

---

## 🎨 `frontend/src/` — UI Layer

We follow a **Navigation-Based Feature** architecture. Instead of generic folders, components are grouped by their primary Sidebar navigation section.

```text
src/
├── context/                   # 🧠 ProspectingContext (SSoT)
├── contracts/                 # 🏷️ Data Contracts (Mirrored from Backend)
│
├── features/                  # 🚀 Business Domains (Grouped by Nav)
│   ├── home/                  # Entry & Exploration Landing
│   ├── profile/               # Prospect & Need Analysis (Tabs 1 & 4)
│   ├── power/                 # Stakeholder, Path & Timeline (Tabs 2, 5 & 6)
│   ├── qualification/         # BANT Deep Dives (Qualification Section)
│   └── shared/                # Global feature primitives (Placeholders, etc.)
│
├── components/                # 🧱 Global UI Shell (Layout, Sidebar)
├── shared/                    # ⚛️ Atomic Design System (Cards, Buttons, Metrics)
├── hooks/                     # ⚓ Functional Logic (usePromptController)
├── lib/                       # 🛠️ Utilities (Design Tokens, Domain Scoring)
└── data/                      # 💾 Mock data & Initial states
```

---

## 🐍 `backend/` — Intelligence Layer

```text
backend/
├── main.py                    # Root FastAPI app
├── features/                  # 🧠 Intelligence Modules
│   ├── prospect/              # Tab-specific Prompting logic
│   └── shared/                # Infrastructure (LLM Client, Cache, Contracts)
├── config/                    # ⚙️ Application Settings
└── venv/                      # Python Virtual environment
```

---

## 🧬 Architectural Strategy

### 1. The Contract System
We maintain **Mirrored Models** between `backend/features/shared/contracts.py` (Pydantic) and `frontend/src/contracts/*.ts` (TypeScript). 

### 2. Feature Consolidation
To avoid "Folder Sprawl", internal sub-tabs like **Need Analysis** are housed within the **Profile** feature, as they share the same business context and data requirements.

### 4. Prompt Management
System prompts are decoupled from Python code. The `backend/features/shared/llm_client.py` utility provides a `load_prompt()` function that reads from the root `/prompts` directory. This allows for clear versioning and prompt iteration without redeploying code logic.
