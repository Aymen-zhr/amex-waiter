# Architecture & Dependency Map — Phase 02: 3-Zone Tactile Table Cards & Floor Canvas

> **Generated:** 2026-09-30  
> **Tool:** Graphify AST & Knowledge Graph Engine  
> **Scope:** Floor module, 3-zone TableCard, 9-table Zustand store, and active service alerts  
> **Status:** Healthy — 0 Import Cycles Detected  

---

## 1. Phase 02 Architectural Additions

```mermaid
graph TD
    subgraph STORE["Zustand Reactive Floor State"]
        FS["useFloorStore.ts"]
        FS_T["9 Seed Tables (01 to 09)<br/>MAIN_DINING (4) • VERANDA (3) • PRIVATE_SALON (2)"]
        FS_ACT["Actions: setActiveZone, updateTableStatus, acknowledgeRequest"]
    end

    subgraph FLOOR_CANVAS["Floor Canvas View (src/components/floor/)"]
        ZF["ZoneFilter.tsx<br/><i>Top Command Ribbon + layoutId='activeZonePill'</i>"]
        FG["FloorGrid.tsx<br/><i>Responsive tablet CSS grid (1-3 cols)</i>"]
        TC["TableCard.tsx<br/><i>Tactile 3-Zone Architecture + whileTap spring</i>"]
    end

    subgraph TC_ANATOMY["3-Zone TableCard Anatomy"]
        Z1["Zone 1: Top Header Row<br/>TABLE XX • Micro Room Tag • Live Status Pill"]
        Z2["Zone 2: Inner Inset Capsule<br/>42px Icon Box • Party Title • Mono Subtitle • Action Chip"]
        Z3["Zone 3: Bottom Footer Row<br/>Next Reservation Turnover • Actions Link"]
    end

    FS --> FS_T
    FS --> FS_ACT
    ZF -.->|Filters by TableZone| FS
    FG --> TC
    TC --> Z1 & Z2 & Z3
    Z2 -.->|Acknowledge Click| FS_ACT
```

---

## 2. Updated Metrics (Graphify AST)
- **Nodes:** 165 (+3 new contracts/actions)
- **Edges:** 301 (+6 new reactive bindings)
- **Communities:** 15 modular clusters
- **Import Cycles:** 0 (Acyclic)

---

## 3. Visual Artifacts
- **Interactive Graph:** [`doc/maintenance/phase-02-dependency-graph.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-02-dependency-graph.html)
- **Call-Flow Map:** [`doc/maintenance/phase-02-callflow-map.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-02-callflow-map.html)
- **Directory Hierarchy:** [`doc/maintenance/phase-02-directory-tree.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-02-directory-tree.html)