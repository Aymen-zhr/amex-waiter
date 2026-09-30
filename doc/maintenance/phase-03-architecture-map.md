# Architecture & Dependency Map — Phase 03: Interactive Modals (Guest Folio & Table Run-Sheet)

> **Generated:** 2026-09-30  
> **Tool:** Graphify AST & Knowledge Graph Engine  
> **Scope:** Modal architecture, `ModalShell`, `GuestFolioModal`, `RunSheetModal`, and `useModalStore`  
> **Status:** Healthy — 0 Import Cycles Detected  

---

## 1. Phase 03 Architectural Additions

```mermaid
graph TD
    subgraph MODAL_STATE["Zustand Modal Store (src/store/useModalStore.ts)"]
        MS["useModalStore.ts"]
        MS_TYPE["activeModal: 'FOLIO' | 'RUN_SHEET' | null"]
        MS_ACTIONS["openFolio(tableId)<br/>openRunSheet(tableId)<br/>closeModal()"]
    end

    subgraph MODAL_SHELL["Accessible Modal Shell (src/components/common/)"]
        M_SHELL["ModalShell.tsx<br/><i>Spring physics (y: 12, damping: 26, stiffness: 320)<br/>Escape key listener • 44px close target • Backdrop blur</i>"]
    end

    subgraph INTERACTIVE_MODALS["Front-of-House Interactive Modals (src/components/modals/)"]
        GFM["GuestFolioModal.tsx<br/><i>TABLE XX • COUVERTS Header<br/>Degustation Course Stepper (Course 3 of 5)<br/>Itemized Ledger + Allergy Warning Badges<br/>Subtotal, 12.5% Service & Grand Total<br/>Print Folio Action</i>"]
        RSM["RunSheetModal.tsx<br/><i>Shift Timeline (Past, Active, Upcoming)<br/>VIP Regular notes • Staff attribution<br/>Direct 'Open Live Folio' link</i>"]
    end

    subgraph TRIGGER_POINTS["Trigger Points"]
        HDR["Header.tsx<br/><i>Run Sheet button</i>"]
        TC["TableCard.tsx<br/><i>Card body tap / 'Actions →' link</i>"]
        APP["App.tsx<br/><i>Master Orchestrator</i>"]
    end

    APP --> MS
    APP --> GFM
    APP --> RSM
    HDR -.->|openRunSheet| MS
    TC -.->|openFolio| MS
    RSM -.->|openFolio| MS
    GFM --> M_SHELL
    RSM --> M_SHELL
```

---

## 2. Updated Metrics (Graphify AST)
- **Nodes:** 169 (+4 new modal components, store contracts, and action triggers)
- **Edges:** 303 (+2 new state bindings)
- **Communities:** 15 modular clusters
- **Import Cycles:** 0 (Acyclic)

---

## 3. Visual Artifacts
- **Interactive Graph:** [`doc/maintenance/phase-03-dependency-graph.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-03-dependency-graph.html)
- **Call-Flow Map:** [`doc/maintenance/phase-03-callflow-map.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-03-callflow-map.html)
- **Directory Hierarchy:** [`doc/maintenance/phase-03-directory-tree.html`](file:///c:/Users/aymen/OneDrive/Desktop/amex-waiter/doc/maintenance/phase-03-directory-tree.html)