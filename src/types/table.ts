export type TableStatus = 'available' | 'seated' | 'alert' | 'pacing' | 'reserved' | 'turnover';

export type DiningZone = 'all' | 'main-dining' | 'terrace' | 'private-salon' | 'cellar-vault';

export interface GuestProfile {
  name: string;
  vipTier?: 'AMEX Centurion' | 'AMEX Platinum' | 'VIP Club' | 'Standard';
  covers: number;
  dietaryAllergies?: string[];
  notes?: string;
  spendToDate?: string;
  sommelierNotes?: string;
}

export interface TableData {
  id: string;
  tableNumber: string;
  zone: 'main-dining' | 'terrace' | 'private-salon' | 'cellar-vault';
  capacity: number;
  status: TableStatus;
  guest?: GuestProfile;
  seatedTime?: string;
  currentCourse?: 'Amuse' | 'Premier Cru' | 'Principal' | 'Grand Dessert' | 'Digestif';
  courseStartTime?: string;
  activeAlert?: string;
  serverName: string;
  totalBill?: string;
}