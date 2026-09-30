# Graph Report - amex-waiter  (2026-09-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 169 nodes · 303 edges · 15 communities (10 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79f9a8e4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- App.tsx
- compilerOptions
- compilerOptions
- Badge.tsx
- table.ts
- react
- OrderCard.tsx
- dependencies
- useAlertStore.ts
- tsconfig.json
- reservation.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `react` - 16 edges
4. `App()` - 14 edges
5. `TableItem` - 11 edges
6. `framer-motion` - 11 edges
7. `Badge()` - 9 edges
8. `lucide-react` - 9 edges
9. `tapSpring` - 9 edges
10. `ModalShell()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ZoneFilterProps` --references--> `TableZone`  [EXTRACTED]
  src/components/floor/ZoneFilter.tsx → src/types/table.ts
- `FloorStoreState` --references--> `TableItem`  [EXTRACTED]
  src/store/useFloorStore.ts → src/types/table.ts
- `FloorGridProps` --references--> `TableItem`  [EXTRACTED]
  src/components/floor/FloorGrid.tsx → src/types/table.ts
- `TableCardProps` --references--> `TableItem`  [EXTRACTED]
  src/components/floor/TableCard.tsx → src/types/table.ts
- `GuestFolioModalProps` --references--> `TableItem`  [EXTRACTED]
  src/components/modals/GuestFolioModal.tsx → src/types/table.ts

## Import Cycles
- None detected.

## Communities (15 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (26): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+18 more)

### Community 1 - "App.tsx"
Cohesion: 0.23
Nodes (18): framer-motion, lucide-react, App(), Header(), HeaderProps, ModalShell(), ModalShellProps, ZoneFilter() (+10 more)

### Community 2 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+11 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 4 - "Badge.tsx"
Cohesion: 0.16
Nodes (12): clsx, tailwind-merge, StockLedger(), WINE_INVENTORY, StockRow(), StockRowProps, WineItem, ActionButtonProps (+4 more)

### Community 5 - "table.ts"
Cohesion: 0.23
Nodes (11): ZoneFilterProps, ZONES, FloorStoreState, INITIAL_TABLES, DiningZone, GuestProfile, NextReservation, ServiceRequest (+3 more)

### Community 6 - "react"
Cohesion: 0.23
Nodes (9): react, react-dom, FloorGrid(), FloorGridProps, TableCard(), TableCardProps, GuestFolioModalProps, RunSheetModalProps (+1 more)

### Community 7 - "OrderCard.tsx"
Cohesion: 0.31
Nodes (8): DispatchBoard(), DispatchBoardProps, SAMPLE_ORDERS, OrderCard(), OrderCardProps, DiningOrder, OrderItem, OrderStatus

### Community 8 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, clsx, framer-motion, lucide-react, react, react-dom, tailwind-merge, zustand

### Community 9 - "useAlertStore.ts"
Cohesion: 0.25
Nodes (6): zustand, AlertStoreState, INITIAL_ALERTS, ServiceAlert, ActiveModalType, ModalState

## Knowledge Gaps
- **90 isolated node(s):** `HeaderProps`, `ModalShellProps`, `Reservation`, `ActionButtonProps`, `ActionButtonVariant` (+85 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 96 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `App.tsx`, `Badge.tsx`, `table.ts`, `OrderCard.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `HeaderProps`, `ModalShellProps`, `Reservation` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._