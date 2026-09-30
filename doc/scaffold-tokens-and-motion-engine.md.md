# Phase 01: Project Scaffold, Luxury Design Tokens & Motion Engine

## 1. High-Level Objective
Scaffold the clean **LUMIÈRE Waiter Tablet OS** from scratch using **React 19 + TypeScript + Vite**. Establish the complete directory architecture, configure luxury bone-porcelain Tailwind tokens, integrate Google typography, and build a reusable Framer Motion animation engine tuned for high-touch tablet ergonomics.

---

## 2. Technical Stack & Setup
Initialize the project environment with the following dependencies:
- **Framework:** `react@^19`, `react-dom@^19`, `vite`, `typescript`
- **Styling:** `tailwindcss@^3.4`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`
- **Motion & Gestures:** `framer-motion`
- **Icons:** `lucide-react` (SVG-native, zero webfont ligatures)
- **Store:** `zustand`

---

## 3. Directory Layout Specification
Establish this exact file structure under `src/`:

```text
src/
├── assets/
│   └── branding/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Badge.tsx
│   │   ├── ActionButton.tsx
│   │   └── ModalShell.tsx
│   ├── floor/
│   │   ├── TableCard.tsx
│   │   ├── ZoneFilter.tsx
│   │   └── FloorGrid.tsx
│   ├── dispatch/
│   │   ├── OrderCard.tsx
│   │   └── DispatchBoard.tsx
│   ├── cellar/
│   │   ├── StockRow.tsx
│   │   └── StockLedger.tsx
│   └── modals/
│       ├── GuestFolioModal.tsx
│       └── RunSheetModal.tsx
├── store/
│   ├── useFloorStore.ts
│   └── useAlertStore.ts
├── styles/
│   ├── fonts.css
│   └── motion.ts
├── types/
│   ├── table.ts
│   ├── order.ts
│   └── reservation.ts
├── App.tsx
└── main.tsx
4. Typography Integration
Inject Google Fonts into index.html:

Display Serif: 'Cormorant Garamond', Georgia, serif (weights: 400, 500, 600, 700)

UI Sans: 'Plus Jakarta Sans', sans-serif (weights: 400, 500, 600, 700)

Tabular Mono: 'JetBrains Mono', monospace (weights: 400, 500)

5. Tailwind Configuration (tailwind.config.js)
Extend the default theme with exact palette tokens:

JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lumiere: {
          canvas: '#FAF8F5',       // Bone porcelain canvas
          card: '#FFFFFF',         // Card surface
          surface: '#F5F2EB',      // Capsule / inset fill
          border: '#ECE7DC',       // Hairline stone border
          borderLight: '#F3EFE6',  // Subdued dividers
          textPrimary: '#1A1815',  // High-contrast espresso charcoal
          textMuted: '#7A7265',    // Muted taupe metadata
          textCaption: '#8A8173',  // Micro labels
          
          // Accent Tokens
          emerald: '#1C3F30',      // Seated / Active dining
          emeraldLight: '#EEF4EC',
          emeraldBorder: '#D5E5D1',
          
          amber: '#B45309',        // Service requests / Overstay alerts
          amberLight: '#FEF3C7',
          amberBorder: '#FDE68A',
          
          brass: '#9E7B35',        // Course pacing / Ready states
          brassLight: '#F7F3E9',
          
          terracotta: '#9E3A26',   // Allergies / 86'd items
          terracottaLight: '#F9EFEB',
          terracottaBorder: '#F0D5CD',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        luxury: '0 10px 30px -10px rgba(26, 24, 21, 0.05), 0 4px 6px -2px rgba(26, 24, 21, 0.02)',
        modal: '0 25px 60px -15px rgba(26, 24, 21, 0.25)',
      }
    }
  },
  plugins: []
};
6. Framer Motion Presets (src/styles/motion.ts)
Create animation constants for touch interactions:

tapSpring: whileTap={{ scale: 0.985 }} transition={{ duration: 0.1 }}

modalMotion:

initial={{ opacity: 0, scale: 0.96, y: 8 }}

animate={{ opacity: 1, scale: 1, y: 0 }}

exit={{ opacity: 0, scale: 0.96, y: 8 }}

transition={{ type: "spring", damping: 26, stiffness: 320 }}

tabLayoutTransition: { type: "spring", damping: 30, stiffness: 350 } for layoutId="activePill"

7. Verification Criteria
Vite dev server runs without TypeScript warnings or compilation failures.

Custom font families render as intended across headings, body, and tabular numbers.

Custom color utility classes (bg-lumiere-canvas, border-lumiere-border, text-lumiere-textPrimary) resolve accurately on the test canvas.