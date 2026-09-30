import React from 'react';
import { StockRow, type WineItem } from './StockRow';

const WINE_INVENTORY: WineItem[] = [
  {
    id: 'w-01',
    name: 'Domaine de la Romanée-Conti, La Tâche Grand Cru',
    vintage: '2015',
    appellation: 'Vosne-Romanée AOC, Bourgogne',
    binLocation: 'VAULT-A-04',
    stockCount: 3,
    price: '€ 5,800',
    status: 'low_stock',
  },
  {
    id: 'w-02',
    name: 'Château Margaux Premier Grand Cru Classé',
    vintage: '1996',
    appellation: 'Margaux AOC, Bordeaux',
    binLocation: 'VAULT-B-12',
    stockCount: 6,
    price: '€ 1,650',
    status: 'available',
  },
  {
    id: 'w-03',
    name: 'Dom Pérignon P2 Plénitude Brut',
    vintage: '2004',
    appellation: 'Champagne AOC',
    binLocation: 'CHILL-01',
    stockCount: 8,
    price: '€ 720',
    status: 'available',
  },
  {
    id: 'w-04',
    name: 'Krug Clos d’Ambonnay Brut Blanc de Noirs',
    vintage: '2002',
    appellation: 'Champagne AOC',
    binLocation: 'VAULT-K-01',
    stockCount: 0,
    price: '€ 3,400',
    status: '86ed',
  },
];

export const StockLedger: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif text-2xl font-medium text-lumiere-textPrimary">
          Cellar Ledger & Allocations
        </h3>
        <p className="text-xs text-lumiere-textMuted">
          Grand Reserve cellar bins with real-time bottle allocations
        </p>
      </div>

      <div className="space-y-2.5">
        {WINE_INVENTORY.map((wine) => (
          <StockRow key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
};