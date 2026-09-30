import React from 'react';
import { TableCard } from './TableCard';
import type { TableItem } from '../../types/table';

interface FloorGridProps {
  tables: TableItem[];
  selectedTableId: string | null;
  onSelectTable: (table: TableItem) => void;
  onAcknowledgeTable?: (tableId: string) => void;
}

export const FloorGrid: React.FC<FloorGridProps> = ({
  tables,
  selectedTableId,
  onSelectTable,
  onAcknowledgeTable,
}) => {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white/60 rounded-3xl border border-dashed border-lumiere-border text-center shadow-sm">
        <p className="font-serif text-2xl font-medium text-lumiere-textPrimary">
          No Tables Located
        </p>
        <p className="text-xs text-lumiere-textMuted mt-1">
          Adjust the room filter above to view other quarters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1680px] mx-auto w-full">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          isSelected={table.id === selectedTableId}
          onSelect={onSelectTable}
          onAcknowledge={onAcknowledgeTable}
        />
      ))}
    </div>
  );
};