import React from 'react';
import { Wine } from 'lucide-react';
import { Badge } from '../common/Badge';

export interface WineItem {
  id: string;
  name: string;
  vintage: string;
  appellation: string;
  binLocation: string;
  stockCount: number;
  price: string;
  status: 'available' | 'low_stock' | '86ed';
}

interface StockRowProps {
  wine: WineItem;
  onAllocate?: (id: string) => void;
}

export const StockRow: React.FC<StockRowProps> = ({ wine, onAllocate }) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-lumiere-border hover:border-lumiere-brass/40 transition-colors flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-lumiere-surface flex items-center justify-center text-lumiere-brass shrink-0">
          <Wine className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-lg font-medium text-lumiere-textPrimary">
              {wine.name}
            </h4>
            <span className="font-mono text-xs text-lumiere-textCaption px-1.5 py-0.5 rounded bg-lumiere-surface">
              {wine.vintage}
            </span>
          </div>
          <p className="text-xs text-lumiere-textMuted mt-0.5">
            {wine.appellation} • Bin <span className="font-mono font-medium">{wine.binLocation}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="font-mono text-sm font-semibold text-lumiere-textPrimary block">
            {wine.price}
          </span>
          <span className="font-mono text-xs text-lumiere-textCaption">
            {wine.stockCount} btls left
          </span>
        </div>

        <Badge
          variant={
            wine.status === '86ed'
              ? 'terracotta'
              : wine.status === 'low_stock'
              ? 'amber'
              : 'emerald'
          }
          dot
          size="sm"
        >
          {wine.status === '86ed'
            ? "86'd"
            : wine.status === 'low_stock'
            ? 'Low Reserve'
            : 'In Cellar'}
        </Badge>

        <button
          onClick={() => onAllocate?.(wine.id)}
          disabled={wine.status === '86ed'}
          className="h-9 px-3.5 rounded-lg border border-lumiere-border bg-white text-xs font-medium text-lumiere-textPrimary hover:bg-lumiere-surface disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          Allocate
        </button>
      </div>
    </div>
  );
};