import { create } from 'zustand';
import type { DiningZone, TableData } from '../types/table';

interface FloorStoreState {
  activeZone: DiningZone;
  selectedTableId: string | null;
  tables: TableData[];
  searchQuery: string;
  setActiveZone: (zone: DiningZone) => void;
  setSelectedTableId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  updateTableStatus: (tableId: string, status: TableData['status']) => void;
  addTableAlert: (tableId: string, alert: string) => void;
  clearTableAlert: (tableId: string) => void;
}

const INITIAL_TABLES: TableData[] = [
  {
    id: 't-01',
    tableNumber: '01',
    zone: 'main-dining',
    capacity: 2,
    status: 'seated',
    seatedTime: '19:15',
    currentCourse: 'Premier Cru',
    courseStartTime: '19:42',
    serverName: 'Antoine M.',
    totalBill: '€ 480,00',
    guest: {
      name: 'M. Henri de Montmirail',
      vipTier: 'AMEX Centurion',
      covers: 2,
      dietaryAllergies: ['Crustaceans', 'Pollen'],
      notes: 'Prefers quiet corner table, vintage Krug enthusiast.',
      spendToDate: '€ 14,200',
      sommelierNotes: 'Poured 2012 Dom Pérignon Rosé',
    },
  },
  {
    id: 't-02',
    tableNumber: '02',
    zone: 'main-dining',
    capacity: 4,
    status: 'alert',
    seatedTime: '18:50',
    currentCourse: 'Principal',
    courseStartTime: '19:25',
    activeAlert: 'Overstay 28m past course turnover',
    serverName: 'Éléonore B.',
    totalBill: '€ 920,00',
    guest: {
      name: 'Baroness Caroline Vance',
      vipTier: 'AMEX Platinum',
      covers: 4,
      dietaryAllergies: ['Strict Gluten-Free'],
      notes: 'Anniversary celebration. Dedicated sommelier attention.',
      spendToDate: '€ 8,950',
    },
  },
  {
    id: 't-03',
    tableNumber: '03',
    zone: 'main-dining',
    capacity: 2,
    status: 'pacing',
    seatedTime: '19:30',
    currentCourse: 'Amuse',
    courseStartTime: '19:48',
    serverName: 'Antoine M.',
    totalBill: '€ 260,00',
    guest: {
      name: 'Dr. Alistair Finch',
      vipTier: 'Standard',
      covers: 2,
      notes: 'First time at Lumière. Wine pairing selected.',
    },
  },
  {
    id: 't-04',
    tableNumber: '04',
    zone: 'main-dining',
    capacity: 6,
    status: 'reserved',
    serverName: 'Éléonore B.',
    guest: {
      name: 'H.E. Ambassador Zhao',
      vipTier: 'AMEX Centurion',
      covers: 6,
      notes: 'Table arriving at 20:30. Ensure Baccarat glassware is staged.',
    },
  },
  {
    id: 't-05',
    tableNumber: '11',
    zone: 'terrace',
    capacity: 4,
    status: 'seated',
    seatedTime: '19:05',
    currentCourse: 'Principal',
    courseStartTime: '19:38',
    serverName: 'Julien K.',
    totalBill: '€ 760,00',
    guest: {
      name: 'Madame Isabelle Moreau',
      vipTier: 'AMEX Platinum',
      covers: 4,
      dietaryAllergies: ['Tree Nuts'],
      notes: 'Requested patio heaters set to medium.',
    },
  },
  {
    id: 't-06',
    tableNumber: '12',
    zone: 'terrace',
    capacity: 2,
    status: 'available',
    serverName: 'Julien K.',
  },
  {
    id: 't-07',
    tableNumber: 'P-01',
    zone: 'private-salon',
    capacity: 12,
    status: 'seated',
    seatedTime: '18:30',
    currentCourse: 'Grand Dessert',
    courseStartTime: '19:55',
    serverName: 'Maître Laurent',
    totalBill: '€ 4,650,00',
    guest: {
      name: 'The Rothschild Syndicate',
      vipTier: 'AMEX Centurion',
      covers: 10,
      notes: 'Private sommelier service. Pre-allocated 1996 Château Margaux.',
      spendToDate: '€ 62,000',
    },
  },
  {
    id: 't-08',
    tableNumber: 'C-01',
    zone: 'cellar-vault',
    capacity: 6,
    status: 'pacing',
    seatedTime: '19:20',
    currentCourse: 'Premier Cru',
    courseStartTime: '19:50',
    serverName: 'Sommelier Bastien',
    totalBill: '€ 2,100,00',
    guest: {
      name: 'Lady Vivienne Sterling',
      vipTier: 'AMEX Centurion',
      covers: 4,
      dietaryAllergies: ['Allium', 'Citrus Oils'],
      notes: 'Tasting menu with blind cellar pairing.',
    },
  },
];

export const useFloorStore = create<FloorStoreState>((set) => ({
  activeZone: 'all',
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
  addTableAlert: (tableId, alert) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, activeAlert: alert, status: 'alert' } : t
      ),
    })),
  clearTableAlert: (tableId) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, activeAlert: undefined, status: 'seated' } : t
      ),
    })),
}));