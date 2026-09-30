import React from 'react';
import { TableCard } from './TableCard';
import type { TableData } from '../../types/table';

interface FloorGridProps {
  tables: TableData[];
  selectedTableId: string | null;
  onSelectTable: (table: TableData) => void;
}

export const FloorGrid: React.FC<FloorGridProps> = ({
  tables,
  selectedTableId,
  onSelectTable,
}) => {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white/50 rounded-2xl border border-dashed border-lumiere-border text-center">
        <p className="font-serif text-xl text-lumiere-textPrimary">No tables located</p>
        <p className="text-xs text-lumiere-textMuted mt-1">
          Adjust the quarter filter above to inspect other dining areas.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          isSelected={table.id === selectedTableId}
          onSelect={onSelectTable}
        />
      ))}
    </div>
  );
};