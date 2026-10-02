# Graph Report - amex-waiter  (2026-10-02)

## Corpus Check
- 40 files · ~69,736 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 236 nodes · 381 edges · 21 communities (13 shown, 8 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `366cd3f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- App
- compilerOptions
- compilerOptions
- OrderCard.tsx
- App.tsx
- Phase 03: Interactive Modals — Guest Folio Ledger & Table Run-Sheet
- Header.tsx
- dependencies
- Phase 03: Interactive Modals — Guest Folio Ledger & Table Run-Sheet
- tsconfig.json
- reservation.ts
- Architecture & Dependency Map — Phase 02: 3-Zone Tactile Table Cards & Floor Canvas
- Phase 01: Project Scaffold, Luxury Design Tokens & Motion Engine
- restore-three-zone-table-cards-and-floor-grid.md
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `react` - 16 edges
3. `App()` - 16 edges
4. `compilerOptions` - 16 edges
5. `3. Module & Dependency Cross-Reference` - 15 edges
6. `framer-motion` - 11 edges
7. `Badge()` - 11 edges
8. `TableItem` - 11 edges
9. `ModalShell()` - 10 edges
10. `lucide-react` - 9 edges

## Surprising Connections (you probably didn't know these)
- `3. Module & Dependency Cross-Reference` --references--> `ActionButton()`  [INFERRED]
  doc/maintenance/phase-01-architecture-map.md → src/components/common/ActionButton.tsx
- `3. Module & Dependency Cross-Reference` --references--> `Header()`  [INFERRED]
  doc/maintenance/phase-01-architecture-map.md → src/components/common/Header.tsx
- `3. Module & Dependency Cross-Reference` --references--> `FloorGrid()`  [INFERRED]
  doc/maintenance/phase-01-architecture-map.md → src/components/floor/FloorGrid.tsx
- `3. Module & Dependency Cross-Reference` --references--> `TableCard()`  [INFERRED]
  doc/maintenance/phase-01-architecture-map.md → src/components/floor/TableCard.tsx
- `Top 10 High-Centrality Hubs ("God Nodes")` --references--> `TableData`  [INFERRED]
  doc/maintenance/phase-01-architecture-map.md → src/types/table.ts

## Import Cycles
- None detected.

## Communities (21 total, 8 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (27): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+19 more)

### Community 1 - "App"
Cohesion: 0.12
Nodes (25): 1. Visual Architecture & Dependency Graph, 2. Graph Metrics & Topological Analysis, 3. Module & Dependency Cross-Reference, 4. Visual Artifact Links, 5. Maintenance Runbook (Updating Graph on Future Phases), Architecture & Dependency Map — Phase 01: Scaffold & Motion Engine, Top 10 High-Centrality Hubs ("God Nodes"), 1. Phase 03 Architectural Additions (+17 more)

### Community 2 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+11 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 4 - "OrderCard.tsx"
Cohesion: 0.15
Nodes (13): clsx, tailwind-merge, ActionButton(), ActionButtonProps, ActionButtonVariant, BadgeProps, BadgeVariant, DispatchBoardProps (+5 more)

### Community 5 - "App.tsx"
Cohesion: 0.15
Nodes (26): framer-motion, lucide-react, react, ModalShellProps, FloorGrid(), FloorGridProps, TableCard(), TableCardProps (+18 more)

### Community 6 - "Phase 03: Interactive Modals — Guest Folio Ledger & Table Run-Sheet"
Cohesion: 0.12
Nodes (16): 1. High-Level Objective, 2. Component Architecture & State Integration, 3. Modal 1: Guest Folio & Degustation Ledger (`GuestFolioModal.tsx`), 4. Modal 2: Table Run-Sheet & Schedule (`RunSheetModal.tsx`), 5. Framer Motion Modal Physics, 6. Verification Criteria, Backdrop:, Component Breakdown (+8 more)

### Community 7 - "Header.tsx"
Cohesion: 0.18
Nodes (11): zustand, Header(), HeaderProps, AlertStoreState, INITIAL_ALERTS, ServiceAlert, useAlertStore, useFloorStore (+3 more)

### Community 8 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, clsx, framer-motion, lucide-react, react, react-dom, tailwind-merge, zustand

### Community 9 - "Phase 03: Interactive Modals — Guest Folio Ledger & Table Run-Sheet"
Cohesion: 0.12
Nodes (16): 1. High-Level Objective, 2. Component Architecture & State Integration, 3. Modal 1: Guest Folio & Degustation Ledger (`GuestFolioModal.tsx`), 4. Modal 2: Table Run-Sheet & Schedule (`RunSheetModal.tsx`), 5. Framer Motion Modal Physics, 6. Verification Criteria, Backdrop:, Component Breakdown (+8 more)

### Community 15 - "Architecture & Dependency Map — Phase 02: 3-Zone Tactile Table Cards & Floor Canvas"
Cohesion: 0.40
Nodes (4): 1. Phase 02 Architectural Additions, 2. Updated Metrics (Graphify AST), 3. Visual Artifacts, Architecture & Dependency Map — Phase 02: 3-Zone Tactile Table Cards & Floor Canvas

### Community 16 - "Phase 01: Project Scaffold, Luxury Design Tokens & Motion Engine"
Cohesion: 0.40
Nodes (4): 1. High-Level Objective, 2. Technical Stack & Setup, 3. Directory Layout Specification, Phase 01: Project Scaffold, Luxury Design Tokens & Motion Engine

### Community 17 - "restore-three-zone-table-cards-and-floor-grid.md"
Cohesion: 0.50
Nodes (3): 1. High-Level Objective, 2. Component Architecture & Data Model, Data Contract (`src/types/table.ts`)

## Knowledge Gaps
- **127 isolated node(s):** `version`, `name`, `preview`, `build`, `dev` (+122 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 142 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `App`, `OrderCard.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `App.tsx` to `package.json`, `OrderCard.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `App()` (e.g. with `3. Module & Dependency Cross-Reference` and `Top 10 High-Centrality Hubs ("God Nodes")`) actually correct?**
  _`App()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `3. Module & Dependency Cross-Reference` (e.g. with `App()` and `StockLedger()`) actually correct?**
  _`3. Module & Dependency Cross-Reference` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `name`, `preview` to the rest of the system?**
  _127 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `App` be split into smaller, more focused modules?**
  _Cohesion score 0.12315270935960591 - nodes in this community are weakly interconnected._