# 📐 Engineering Standards & Full-Stack Rules

This document defines the architectural patterns and coding standards for the **Prospect Radar**. Adherence to these rules ensures the codebase remains modular, performant, and maintainable for senior developers.

---

## 🏗️ 1. Architecture & Folder Strategy

### 1.1 "Feature-First" Organization
- All functional modules (Home, Profile, Power, Pain, Path) must live in their respective `features/` directory in both Frontend and Backend.
- Each feature is a self-contained module with its own components and barrel exports (`index.ts` / `feature_module.py`).

### 1.2 The Orchestrator Pattern
- Top-level feature components (e.g., `ProfileStage.tsx` in React) are **Orchestrators**.
- Orchestrators must only contain **Layout (CSS Grid/Flex)** and delegate content to smaller components.
- Keep prompt-engineering logic in the **Backend Feature Modules** and only return pure data to the UI.

### 1.3 Mirrored Contract System (SSoT)
- **MANDATORY**: All data exchanged between the UI and API must be defined in the **Contract System**.
- **Backend**: Defined via Pydantic in `backend/features/shared/contracts.py`.
- **Frontend**: Defined via TypeScript in `frontend/src/contracts/`.
- Never use `any` for prospect data. Both sides must share the same interface.

---

## 🧱 2. Component Development (Frontend)

### 2.1 Reusability First
- Generic visual patterns (e.g., `MetricBox`, `InfoRow`) belong in `src/components/ui/`.
- Components should be "Dumb" (Functional). They receive data via props and render accordingly.

### 2.2 Functional Registry Pattern
- Use **Registry Objects** for dynamic rendering (as seen in `App.tsx`'s stage router).
- Avoid giant switch statements. Map tab IDs directly to Component instances.

### 2.3 File Length
- Aim for components under **100 lines**. If a card gets too complex, split it into local sub-components within the same feature folder.

---

## 🎨 3. Styling & UX

### 3.1 Tailwind & Semantic Tokens
- Use Tailwind utility classes for 99% of styling.
- Use semantic tokens (e.g., `text-slate-900`, `bg-slate-50/80`) to maintain a clean "Glassmorphism" look.
- **Micro-Animations**: Use Framer Motion or GSAP for state transitions (e.g., the onboarding slider).

### 3.2 Layout Encapsulation
- Use the `DashboardLayout` component for all dashboard pages to ensure consistent shell behavior (PageHeader, Sidebar, Tabs). 

---

## 💾 4. Data & State Management

### 4.1 Prospecting Context (SSoT)
- All shared app state (Identity, Organization, Seller Context) resides in the `ProspectingContext.tsx`.
- Components should rely on this context and never fetch raw data independently.

### 4.2 Lazy Loading (Prompt Controller)
- Insight tabs use the `usePromptController` for dynamic data fetching.
- Tab-specific components must handle the loading state (e.g., using `SkeletonCard`) provided by the controller.

---

## 🐍 5. Backend AI Standards

### 5.1 Prompt Engineering
- Keep prompt strings as **Python Constants** in the corresponding feature module.
- Always use **Pydantic Validation** on the LLM's output before returning it to the frontend.
- Log prompt previews and response times for observability.

### 5.2 Type Safety
- Use strict Python type-hints (`List`, `Optional`, `Dict`) in all service methods.
- Avoid passing raw dictionaries; use the Pydantic models from `contracts.py`.

---

## 🧹 6. Code Quality & Maintenance

### 6.1 No Dead Code
- **MANDATORY**: Remove all commented-out code, unused imports, and dead variables before finalizing a task.

### 6.2 Naming Conventions
- **Frontend Components**: PascalCase (`ProfileCard.tsx`).
- **Backend Modules**: snake_case (`enrichment_service.py`).
- **Contracts**: PascalCase + Type (`IdentityContract`).