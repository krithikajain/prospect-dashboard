# Colors & UX Design Reference

> Complete reference of every color, font, spacing token, and styling pattern used across the Prospect Dashboard.

---

## 🎨 Color Palette

### Core Neutrals

| Token                 | Hex         | Usage                                          |
| --------------------- | ----------- | ---------------------------------------------- |
| `bg-neutral`          | `#F9FAFB`   | Page background (light warm gray)              |
| `primary-text`        | `#000000`   | Headings, primary text, active nav pills       |
| `secondary-text`      | `#6B7280`   | Subheadings, labels, descriptions              |
| `border-light`        | `#F1F5F9`   | Card borders, dividers                         |
| Slate 100             | `#F1F5F9`   | Subtle backgrounds, hover states               |
| Slate 200             | `#E2E8F0`   | Borders, separator lines                       |
| Slate 400             | `#94A3B8`   | Placeholder text, disabled icons               |
| Slate 500             | `#64748B`   | Inactive tab text, muted labels                |
| Slate 800             | `#1E293B`   | High-contrast text on light backgrounds        |

### Accent Colors — Signals & Status

| Token                 | Hex         | Usage                                          |
| --------------------- | ----------- | ---------------------------------------------- |
| `accent-up`           | `#E6F4EA`   | Positive trend background (green tint)         |
| `accent-up-text`      | `#1E7E34`   | Positive trend text                            |
| `accent-down`         | `#FEF2F2`   | Negative trend background (red tint)           |
| `accent-down-text`    | `#DC2626`   | Negative trend / danger text                   |

### StatusTag Variants
> **Note**: These variants and semantic color mappings are centralized in `src/lib/theme.ts` via the `themeVariants` object. Do not redefine color maps in components.

| Variant   | Background    | Text          | Use Case                         |
| --------- | ------------- | ------------- | -------------------------------- |
| Success   | `#E6F4EA`     | `#1E7E34`     | High confidence, positive signal |
| Warning   | `#FEF9C3`     | `#A16207`     | Medium confidence, caution       |
| Danger    | `#FEF2F2`     | `#DC2626`     | Low confidence, risk alert       |
| Info      | `#EFF6FF`     | `#2563EB`     | Neutral information, blue accent |

### Glassmorphism Surface

| Property          | Value                          |
| ----------------- | ------------------------------ |
| Background        | `rgba(255, 255, 255, 0.8)`     |
| Backdrop blur     | `blur(12px)`                   |
| Border            | `1px solid #F1F5F9`            |
| Border radius     | `32px`                         |
| Box shadow        | `0 4px 24px -1px rgba(0,0,0,0.02)` |

---

## 🔤 Typography

### Font Family

| Font        | Weight Range    | Source                                              |
| ----------- | --------------- | --------------------------------------------------- |
| **Inter**   | 200–600         | `https://fonts.googleapis.com/css2?family=Inter`    |

### Font Weight Usage

| Weight | Name        | Where it's used                            |
| ------ | ----------- | ------------------------------------------ |
| 200    | Extra Light | Material icon default `wght`               |
| 300    | Light       | Subtle labels, secondary info              |
| 400    | Regular     | Body text, descriptions                    |
| 500    | Medium      | Pill badges, trend pills, button labels    |
| 600    | Semibold    | Tab labels, card headers, emphasis         |

### Text Sizes (Common Tailwind Classes Used)

| Class          | Size   | Usage                                     |
| -------------- | ------ | ----------------------------------------- |
| `text-[11px]`  | 11px   | Trend pills, micro-labels                 |
| `text-xs`      | 12px   | Footnotes, timestamps                     |
| `text-sm`      | 14px   | Card body text, tab labels                |
| `text-base`    | 16px   | Standard body text                        |
| `text-lg`      | 18px   | Section subheadings                       |
| `text-xl`      | 20px   | Card titles                               |
| `text-2xl`     | 24px   | Page headers, large scores                |
| `text-[40px]`  | 40px   | Placeholder view icons                    |

---

## 🎯 Icons

### Material Symbols Outlined

**Import**: `@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap')`

**Default settings**:
```css
font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
```

**Usage**: `<span className="material-symbols-outlined">icon_name</span>`

**Common icons used**: `home`, `person_search`, `person`, `groups`, `target`, `moving`, `fact_check`, `payments`, `shield_person`, `psychology`, `schedule`, `timeline`, `lightbulb`

### Lucide React

Secondary icon library for additional icon variety. Used alongside Material Symbols.

---

## 📐 Spacing & Layout Tokens

### Border Radius

| Token       | Value   | Usage                                      |
| ----------- | ------- | ------------------------------------------ |
| `card`      | `32px`  | Main content cards, glass cards            |
| `9999px`    | Full    | Nav pills, status tags, trend pills        |
| `20px`      | —       | Folder tab corners (top-left, top-right)   |

### Common Padding

| Context               | Value           |
| --------------------- | --------------- |
| Nav pills             | `8px 20px`      |
| Folder tabs           | `12px 24px`     |
| Main content area     | `pt-32 px-12 pb-12` (Tailwind)  |
| Card internal padding | `p-10` (40px)   |
| Trend pills           | `2px 8px`       |

### Layout Constraints

| Property        | Value          |
| --------------- | -------------- |
| Max content width | `1400px`     |
| Min card height   | `500px`      |

---

## 🧩 Component Styling Patterns

### Nav Pill (Active)
```css
background: #000000;
color: #ffffff;
border-radius: 9999px;
padding: 8px 20px;
```

### Folder Tab (Inactive)
```css
padding: 12px 24px;
font-size: 14px;
font-weight: 600;
color: #64748b;
background: transparent;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
transition: all 0.2s;
```

### Folder Tab (Active)
```css
background: #ffffff;
color: #0f172a;
z-index: 30;
/* Inverted corner pseudo-elements connect tab to content */
```

### Trend Pill (Up)
```css
background: #E6F4EA;
color: #1E7E34;
padding: 2px 8px;
border-radius: 9999px;
font-size: 11px;
font-weight: 500;
```

### Trend Pill (Down)
```css
background: #FEF2F2;
color: #DC2626;
padding: 2px 8px;
border-radius: 9999px;
font-size: 11px;
font-weight: 500;
```

### Glass Card
```css
background-color: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border: 1px solid #F1F5F9;
border-radius: 32px;
box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.02);
```

### Content Container
```css
background: #ffffff;
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
border: 1px solid rgba(226, 232, 240, 0.8); /* slate-200/80 */
border-radius: 32px;
padding: 40px;
```

---

## 🌀 Animations & Transitions

| Library          | Usage                                             |
| ---------------- | ------------------------------------------------- |
| **Framer Motion** | Page transitions, card entrance animations, hover effects, expand/collapse |
| **GSAP**          | Complex timeline animations, scroll-driven effects |
| **CSS transitions** | Tab hover (`all 0.2s`), gauge stroke animations (`1s ease`) |

### 3D Flip Card Utilities
```css
.perspective-1000  { perspective: 1000px; }
.preserve-3d       { transform-style: preserve-3d; }
.backface-hidden   { backface-visibility: hidden; }
```

### Thin Gauge (SVG Score Rings)
```css
.thin-gauge {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
}
```

---

## 🎨 Design Philosophy

1. **Clean & minimal** — White-dominant with soft shadows. No heavy borders.
2. **Glassmorphism accents** — Frosted glass surfaces for depth without clutter.
3. **Signal-driven color** — Green = positive, Red = negative, Yellow = caution, Blue = info. Colors always carry meaning.
4. **Folder-tab metaphor** — Tabs connect to content below like real file folders (inverted corner radii).
5. **Black nav pills** — Active navigation uses solid black for maximum contrast.
6. **Consistent radius** — 32px for cards, full-round for pills/tags.
7. **Inter everywhere** — Single font family (Inter 200–600) ensures visual consistency.
