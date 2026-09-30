export interface Reservation {
  id: string;
  guestName: string;
  partySize: number;
  time: string;
  zone: string;
  tableAssigned?: string;
  tier?: 'Centurion' | 'Platinum' | 'VIP' | 'Guest';
  notes?: string;
  dietaryRequirements?: string[];
  confirmedBy?: string;
}