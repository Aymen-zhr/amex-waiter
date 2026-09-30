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

export interface GuestProfile {
  name: string;
  vipTier?: 'AMEX Centurion' | 'AMEX Platinum' | 'VIP Club' | 'Standard';
  covers: number;
  dietaryAllergies?: string[];
  notes?: string;
  spendToDate?: string;
  sommelierNotes?: string;
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
  guest?: GuestProfile;
  serverName?: string;
  totalBill?: string;
}

// Backward-compatibility aliases
export type TableData = TableItem;
export type DiningZone = TableZone;