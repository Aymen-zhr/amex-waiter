Phase 02: 3-Zone Tactile Table Cards & Floor Canvas Architecture

## 1. High-Level Objective
Build the core Floor Grid (`Tables`) view and re-implement the tactile, three-zone card architecture (`TABLE 01` display header, inset rounded capsule with cutlery/dish icon, and bottom reservation turnover footer). Connect the cards to a reactive Zustand floor store and integrate Framer Motion spring physics for tablet touch feedback.

---

## 2. Component Architecture & Data Model

### Data Contract (`src/types/table.ts`)
Define strict types for floor table management:
```typescript
export type TableZone = 'ALL' | 'MAIN_DINING' | 'VERANDA' | 'PRIVATE_SALON';

export type TableStatus = 'AVAILABLE' | 'DINING' | 'WAITING' | 'REQUEST';

export interface ServiceRequest {
  type: 'WATER_REFILL' | 'CALL_SERVER' | 'SOMMELIER' | 'BILL_REQUEST';
  label: string;
  pendingSinceMinutes: number;
}

export interface NextReservation {
  time: string;
  partyName: string;
  guestCount: number;
}

export interface TableItem {
  id: string;
  tableNumber: string; // e.g. "01", "02", "15"
  zone: TableZone;
  status: TableStatus;
  capacity: number;
  guestCount?: number;
  activeCourse?: string; // e.g. "Course 3 of 5 • Plat Principal"
  seatedMinutes?: number;
  serviceRequest?: ServiceRequest;
  nextReservation?: NextReservation;
}
3. The 3-Zone Table Card Anatomy (src/components/floor/TableCard.tsx)Every table card must render as an elevated white surface (bg-lumiere-card border border-lumiere-border rounded-3xl p-4 shadow-luxury) with three distinct visual zones:Zone 1: Top Header RowLeft: Display title TABLE XX (font-serif text-xl font-bold tracking-wide text-lumiere-textPrimary) alongside a micro room capsule (e.g. [ MAIN DINING ] in font-mono text-[10px] uppercase text-lumiere-textMuted bg-lumiere-surface border border-lumiere-border px-2 py-0.5 rounded-full).   Right: Status pill matching the live table state:AVAILABLE: [ • EMPTY ] (bg-lumiere-surface text-lumiere-textMuted).   DINING: [ • DINING ] (bg-lumiere-emeraldLight text-lumiere-emerald border border-lumiere-emeraldBorder).WAITING: [ • PACING ] (bg-lumiere-brassLight text-lumiere-brass).REQUEST: [ • SERVICE ] (bg-lumiere-amberLight text-lumiere-amber border border-lumiere-amberBorder).Divider: Subtle hairline rule (border-b border-lumiere-borderLight pt-2.5).Zone 2: Inner Inset Capsule (Card Body)Container: Rounded inset container (rounded-2xl bg-lumiere-canvas border border-lumiere-border p-3.5 flex items-center justify-between gap-3 mt-3).   Leading Icon Tile: 42×42px square-rounded tile (rounded-xl bg-white border border-lumiere-border flex items-center justify-center text-lumiere-textMuted shrink-0):   AVAILABLE: Crossed utensils / cutlery icon (UtensilsCrossed from Lucide).   DINING: Platter cloche / wine glass icon (Utensils or Wine).REQUEST: Service bell or water icon (Bell or Droplets).Center Typography:Title: State or party name in medium serif/sans (Available, Sterling Party (4G), or Water Refill).   Subtitle: Tabular metadata in mono (Capacity: 2 Guests • Open or Course 3 of 5 • Seated 45m).   Trailing Action/Status Chip:AVAILABLE: READY tag in soft sage (text-lumiere-emerald bg-lumiere-emeraldLight font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md).   REQUEST: Acknowledge action button in warm amber (bg-lumiere-amber text-white font-mono text-xs px-3 py-1.5 rounded-full).Zone 3: Bottom Footer RowDivider: Hairline rule (border-t border-lumiere-borderLight mt-3 pt-2.5).   Left Caption: Next turnover reservation or seating duration (• Next: 20:30 • M. Laurent (2G) or • Seated: 45m ago).   Right Action Link: Subtle tactile text button with chevron: Actions › (text-xs font-mono font-semibold text-lumiere-textPrimary hover:underline). Tapping opens the table action options.   4. Floor Grid & Zone Filtering (src/components/floor/FloorGrid.tsx)Top Command Ribbon: Unified zone filter strip with animated sliding pill indicator (layoutId="activeZonePill"):[ All Rooms (9) ] · [ Main Dining (4) ] · [ Veranda (3) ] · [ Private Salon (2) ].   Responsive Layout: Adaptive CSS Grid spanning widescreen tablet viewports:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1680px] mx-auto w-full.Touch Ergonomics: Wrap each card in Framer Motion’s motion.div with whileTap={{ scale: 0.985 }}.5. Zustand Floor Store (src/store/useFloorStore.ts)Provide mock seed data for 9 dining tables (mirroring tables 01 through 09) covering:Available tables (Table 01, Table 07).   Active dining tables with course progression (Table 02, Table 06).   Service call tables requiring waiter attention (Table 03: Water Refill, Table 05: Sommelier Request, Table 08: Call Server).   Actions to acknowledge service requests and toggle table status.6. Verification CriteriaTable cards faithfully reproduce the 3-zone visual hierarchy (display header, inner inset capsule with icon box, and bottom reservation footer)[cite: 6].Room zone switching filters the 9-table grid without layout glitches or page jumps.Tapping "Acknowledge" on a service request clears the alert state and returns the table to its active dining profile.Framer Motion tap springs provide responsive feedback on touch events.