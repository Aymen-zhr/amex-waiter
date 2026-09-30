# Graph Report - amex-waiter  (2026-09-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 162 nodes · 295 edges · 15 communities (10 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3510aaa6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- TableCard.tsx
- App.tsx
- package.json
- compilerOptions
- compilerOptions
- Badge.tsx
- OrderCard.tsx
- devDependencies
- dependencies
- react
- tsconfig.json
- reservation.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `react` - 16 edges
4. `Badge()` - 15 edges
5. `App()` - 13 edges
6. `TableData` - 9 edges
7. `lucide-react` - 9 edges
8. `framer-motion` - 9 edges
9. `ModalShell()` - 7 edges
10. `tapSpring` - 7 edges

## Surprising Connections (you probably didn't know these)
- `FloorGridProps` --references--> `TableData`  [EXTRACTED]
  src/components/floor/FloorGrid.tsx → src/types/table.ts
- `TableCardProps` --references--> `TableData`  [EXTRACTED]
  src/components/floor/TableCard.tsx → src/types/table.ts
- `ZoneFilterProps` --references--> `DiningZone`  [EXTRACTED]
  src/components/floor/ZoneFilter.tsx → src/types/table.ts
- `GuestFolioModalProps` --references--> `TableData`  [EXTRACTED]
  src/components/modals/GuestFolioModal.tsx → src/types/table.ts
- `DispatchBoardProps` --references--> `DiningOrder`  [EXTRACTED]
  src/components/dispatch/DispatchBoard.tsx → src/types/order.ts

## Import Cycles
- None detected.

## Communities (15 total, 5 thin omitted)

### Community 0 - "TableCard.tsx"
Cohesion: 0.14
Nodes (17): zustand, FloorGrid(), FloorGridProps, TableCard(), TableCardProps, ZoneFilterProps, ZONES, GuestFolioModalProps (+9 more)

### Community 1 - "App.tsx"
Cohesion: 0.26
Nodes (15): lucide-react, App(), ActionButton(), Badge(), Header(), HeaderProps, ModalShell(), ModalShellProps (+7 more)

### Community 2 - "package.json"
Cohesion: 0.11
Nodes (18): name, private, scripts, build, dev, lint, preview, type (+10 more)

### Community 3 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+11 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 5 - "Badge.tsx"
Cohesion: 0.16
Nodes (11): clsx, framer-motion, tailwind-merge, ActionButtonProps, ActionButtonVariant, BadgeProps, BadgeVariant, modalMotion (+3 more)

### Community 6 - "OrderCard.tsx"
Cohesion: 0.31
Nodes (8): DispatchBoard(), DispatchBoardProps, SAMPLE_ORDERS, OrderCard(), OrderCardProps, DiningOrder, OrderItem, OrderStatus

### Community 7 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+1 more)

### Community 8 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, clsx, framer-motion, lucide-react, react, react-dom, tailwind-merge, zustand

### Community 9 - "react"
Cohesion: 0.39
Nodes (6): react, StockLedger(), WINE_INVENTORY, StockRow(), StockRowProps, WineItem

## Knowledge Gaps
- **86 isolated node(s):** `AlertStoreState`, `ServiceAlert`, `GuestProfile`, `TableStatus`, `HeaderProps` (+81 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 92 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `TableCard.tsx`, `App.tsx`, `package.json`, `Badge.tsx`, `OrderCard.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `AlertStoreState`, `ServiceAlert`, `GuestProfile` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TableCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1383399209486166 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._