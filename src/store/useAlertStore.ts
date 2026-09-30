import { create } from 'zustand';

export interface ServiceAlert {
  id: string;
  tableNumber: string;
  type: 'overstay' | 'sommelier' | 'allergy' | 'bill_request' | 'course_ready';
  severity: 'brass' | 'amber' | 'terracotta';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface AlertStoreState {
  alerts: ServiceAlert[];
  dismissAlert: (id: string) => void;
  markAsRead: (id: string) => void;
  addAlert: (alert: Omit<ServiceAlert, 'id' | 'isRead'>) => void;
}

const INITIAL_ALERTS: ServiceAlert[] = [
  {
    id: 'alt-01',
    tableNumber: '02',
    type: 'overstay',
    severity: 'amber',
    title: 'Service Pacing Delay',
    description: 'Table 02 seated for 28m past target course turnover. Check wine glasses.',
    timestamp: '19:48',
    isRead: false,
  },
  {
    id: 'alt-02',
    tableNumber: 'P-01',
    type: 'sommelier',
    severity: 'brass',
    title: 'Sommelier Summoned',
    description: 'Private Salon requests vintage Port presentation for Grand Dessert.',
    timestamp: '19:52',
    isRead: false,
  },
  {
    id: 'alt-03',
    tableNumber: '01',
    type: 'allergy',
    severity: 'terracotta',
    title: 'Strict Crustacean Protocol',
    description: 'Kitchen notified: Table 01 amuse-bouche must omit langoustine emulsion.',
    timestamp: '19:40',
    isRead: true,
  },
];

export const useAlertStore = create<AlertStoreState>((set) => ({
  alerts: INITIAL_ALERTS,
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
  markAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    })),
  addAlert: (alertData) =>
    set((state) => ({
      alerts: [
        {
          ...alertData,
          id: 'alt-' + Date.now(),
          isRead: false,
        },
        ...state.alerts,
      ],
    })),
}));