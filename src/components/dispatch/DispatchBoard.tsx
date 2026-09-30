import React from 'react';
import { OrderCard } from './OrderCard';
import type { DiningOrder } from '../../types/order';

interface DispatchBoardProps {
  orders?: DiningOrder[];
}

const SAMPLE_ORDERS: DiningOrder[] = [
  {
    id: 'ord-01',
    tableId: 't-01',
    tableNumber: '01',
    serverName: 'Antoine M.',
    orderedAt: '19:42',
    total: 480,
    status: 'urgent',
    items: [
      {
        id: 'itm-1',
        name: 'Caviar Oscietre Imperial & Brioche Feuilletée',
        quantity: 1,
        price: 180,
        course: 'Premier',
        status: 'firing',
      },
      {
        id: 'itm-2',
        name: 'Turbot Sauvage Rôti à la Moelle',
        quantity: 2,
        price: 150,
        course: 'Principal',
        status: 'pending',
        notes: 'Crustacean-free kitchen preparation',
      },
    ],
  },
  {
    id: 'ord-02',
    tableId: 't-02',
    tableNumber: '02',
    serverName: 'Éléonore B.',
    orderedAt: '19:25',
    total: 920,
    status: 'active',
    items: [
      {
        id: 'itm-3',
        name: 'Pigeonneau de Bresse en Croute de Sel',
        quantity: 4,
        price: 230,
        course: 'Principal',
        status: 'firing',
        allergens: ['Strict Gluten-Free'],
      },
    ],
  },
];

export const DispatchBoard: React.FC<DispatchBoardProps> = ({ orders = SAMPLE_ORDERS }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-medium text-lumiere-textPrimary">
            Pass & Dispatch
          </h3>
          <p className="text-xs text-lumiere-textMuted">
            Synchronized course tickets from the central pass
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};