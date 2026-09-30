import { create } from 'zustand';
import type { TableItem, TableZone, TableStatus, ServiceRequest } from '../types/table';

interface FloorStoreState {
  activeZone: TableZone;
  selectedTableId: string | null;
  tables: TableItem[];
  searchQuery: string;
  setActiveZone: (zone: TableZone) => void;
  setSelectedTableId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  acknowledgeRequest: (tableId: string) => void;
  setServiceRequest: (tableId: string, request: ServiceRequest | undefined) => void;
}

const INITIAL_TABLES: TableItem[] = [
  // 1. MAIN DINING (4 Tables)
  {
    id: 'table-01',
    tableNumber: '01',
    zone: 'MAIN_DINING',
    status: 'AVAILABLE',
    capacity: 2,
    serverName: 'Antoine M.',
    nextReservation: {
      time: '20:30',
      partyName: 'M. Laurent',
      guestCount: 2,
    },
  },
  {
    id: 'table-02',
    tableNumber: '02',
    zone: 'MAIN_DINING',
    status: 'DINING',
    capacity: 4,
    guestCount: 4,
    activeCourse: 'Course 3 of 5 • Plat Principal',
    seatedMinutes: 45,
    serverName: 'Éléonore B.',
    totalBill: '€ 680,00',
    nextReservation: {
      time: '21:45',
      partyName: 'Vance Party',
      guestCount: 4,
    },
    guest: {
      name: 'Baroness Caroline Vance',
      vipTier: 'AMEX Platinum',
      covers: 4,
      dietaryAllergies: ['Strict Gluten-Free'],
      spendToDate: '€ 8,950',
      notes: 'Anniversary celebration. Pacing requested at 25m between courses.',
    },
  },
  {
    id: 'table-03',
    tableNumber: '03',
    zone: 'MAIN_DINING',
    status: 'REQUEST',
    capacity: 2,
    guestCount: 2,
    activeCourse: 'Course 2 of 5 • Entrée',
    seatedMinutes: 30,
    serverName: 'Antoine M.',
    totalBill: '€ 340,00',
    serviceRequest: {
      type: 'WATER_REFILL',
      label: 'Water Refill',
      pendingSinceMinutes: 4,
    },
    guest: {
      name: 'Henri de Montmirail',
      vipTier: 'AMEX Centurion',
      covers: 2,
      dietaryAllergies: ['Crustaceans', 'Pollen'],
      spendToDate: '€ 14,200',
      notes: 'Sparkling Châteldon preferred.',
    },
  },
  {
    id: 'table-04',
    tableNumber: '04',
    zone: 'MAIN_DINING',
    status: 'WAITING',
    capacity: 6,
    guestCount: 6,
    activeCourse: 'Course 4 of 6 • Pré-Dessert',
    seatedMinutes: 75,
    serverName: 'Éléonore B.',
    totalBill: '€ 1,840,00',
    nextReservation: {
      time: '22:00',
      partyName: 'Arnault Group',
      guestCount: 6,
    },
    guest: {
      name: 'H.E. Ambassador Zhao',
      vipTier: 'AMEX Centurion',
      covers: 6,
      notes: 'Baccarat glassware staged. Pacing slowed for diplomatic toasts.',
    },
  },

  // 2. VERANDA (3 Tables)
  {
    id: 'table-05',
    tableNumber: '05',
    zone: 'VERANDA',
    status: 'REQUEST',
    capacity: 4,
    guestCount: 4,
    activeCourse: 'Course 1 of 4 • Premier Cru',
    seatedMinutes: 20,
    serverName: 'Julien K.',
    totalBill: '€ 520,00',
    serviceRequest: {
      type: 'SOMMELIER',
      label: 'Sommelier Request',
      pendingSinceMinutes: 6,
    },
    guest: {
      name: 'Madame Isabelle Moreau',
      vipTier: 'AMEX Platinum',
      covers: 4,
      dietaryAllergies: ['Tree Nuts'],
      notes: 'Consulting sommelier on Meursault vintage pairing.',
    },
  },
  {
    id: 'table-06',
    tableNumber: '06',
    zone: 'VERANDA',
    status: 'DINING',
    capacity: 2,
    guestCount: 2,
    activeCourse: 'Course 4 of 5 • Grand Dessert',
    seatedMinutes: 80,
    serverName: 'Julien K.',
    totalBill: '€ 310,00',
    nextReservation: {
      time: '21:30',
      partyName: 'Dr. Finch',
      guestCount: 2,
    },
    guest: {
      name: 'Dr. Alistair Finch',
      vipTier: 'Standard',
      covers: 2,
      notes: 'Tasting menu wine pairing completed.',
    },
  },
  {
    id: 'table-07',
    tableNumber: '07',
    zone: 'VERANDA',
    status: 'AVAILABLE',
    capacity: 4,
    serverName: 'Julien K.',
    nextReservation: {
      time: '20:45',
      partyName: 'Moreau Party',
      guestCount: 4,
    },
  },

  // 3. PRIVATE SALON (2 Tables)
  {
    id: 'table-08',
    tableNumber: '08',
    zone: 'PRIVATE_SALON',
    status: 'REQUEST',
    capacity: 12,
    guestCount: 10,
    activeCourse: 'Course 5 of 7 • Fromages Affinés',
    seatedMinutes: 110,
    serverName: 'Maître Laurent',
    totalBill: '€ 4,650,00',
    serviceRequest: {
      type: 'CALL_SERVER',
      label: 'Call Server',
      pendingSinceMinutes: 2,
    },
    guest: {
      name: 'The Rothschild Syndicate',
      vipTier: 'AMEX Centurion',
      covers: 10,
      spendToDate: '€ 62,000',
      notes: 'Private tasting room. Summoned server for digestif cart.',
    },
  },
  {
    id: 'table-09',
    tableNumber: '09',
    zone: 'PRIVATE_SALON',
    status: 'WAITING',
    capacity: 8,
    guestCount: 8,
    activeCourse: 'Course 3 of 6 • Principal Agneau',
    seatedMinutes: 65,
    serverName: 'Maître Laurent',
    totalBill: '€ 2,900,00',
    nextReservation: {
      time: '22:30',
      partyName: 'Sterling Syndicate',
      guestCount: 8,
    },
    guest: {
      name: 'Lady Vivienne Sterling',
      vipTier: 'AMEX Centurion',
      covers: 8,
      dietaryAllergies: ['Citrus Oils'],
      notes: 'Kitchen notified on citrus oils. Pacing synchronized with kitchen pass.',
    },
  },
];

export const useFloorStore = create<FloorStoreState>((set) => ({
  activeZone: 'ALL',
  selectedTableId: null,
  tables: INITIAL_TABLES,
  searchQuery: '',
  setActiveZone: (zone) => set({ activeZone: zone }),
  setSelectedTableId: (id) => set({ selectedTableId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  updateTableStatus: (tableId, status) =>
    set((state) => ({
      tables: state.tables.map((t) => (t.id === tableId ? { ...t, status } : t)),
    })),
  acknowledgeRequest: (tableId) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId
          ? {
              ...t,
              serviceRequest: undefined,
              status: t.guestCount ? 'DINING' : 'AVAILABLE',
            }
          : t
      ),
    })),
  setServiceRequest: (tableId, request) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId
          ? {
              ...t,
              serviceRequest: request,
              status: request ? 'REQUEST' : t.guestCount ? 'DINING' : 'AVAILABLE',
            }
          : t
      ),
    })),
}));