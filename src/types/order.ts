export type OrderStatus = 'pending' | 'firing' | 'coursing' | 'served' | 'voided';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  course: 'Amuse' | 'Premier' | 'Principal' | 'Fromage' | 'Dessert';
  allergens?: string[];
  status: OrderStatus;
  notes?: string;
  is86ed?: boolean;
}

export interface DiningOrder {
  id: string;
  tableId: string;
  tableNumber: string;
  serverName: string;
  items: OrderItem[];
  orderedAt: string;
  total: number;
  status: 'active' | 'completed' | 'urgent';
}