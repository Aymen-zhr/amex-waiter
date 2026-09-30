import React from 'react';
import { motion } from 'framer-motion';
import { tabLayoutTransition } from '../../styles/motion';
import type { TableZone } from '../../types/table';

interface ZoneFilterProps {
  activeZone: TableZone;
  onSelectZone: (zone: TableZone) => void;
  counts: Record<TableZone, number>;
}

const ZONES: { id: TableZone; label: string }[] = [
  { id: 'ALL', label: 'All Rooms' },
  { id: 'MAIN_DINING', label: 'Main Dining' },
  { id: 'VERANDA', label: 'Veranda' },
  { id: 'PRIVATE_SALON', label: 'Private Salon' },
];

export const ZoneFilter: React.FC<ZoneFilterProps> = ({
  activeZone,
  onSelectZone,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-lumiere-surface/80 rounded-2xl border border-lumiere-borderLight overflow-x-auto no-scrollbar shadow-sm">
      {ZONES.map((zone) => {
        const isActive = activeZone === zone.id;
        const count = counts[zone.id] ?? 0;

        return (
          <button
            key={zone.id}
            onClick={() => onSelectZone(zone.id)}
            className={`relative px-4 py-2.5 text-xs font-medium rounded-xl transition-colors duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
              isActive
                ? 'text-lumiere-textPrimary font-semibold'
                : 'text-lumiere-textMuted hover:text-lumiere-textPrimary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeZonePill"
                transition={tabLayoutTransition}
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-lumiere-border"
              />
            )}
            <span className="relative z-10">{zone.label}</span>
            <span
              className={`relative z-10 px-2 py-0.5 rounded-full font-mono text-[10px] tabular-nums ${
                isActive
                  ? 'bg-lumiere-surface text-lumiere-textPrimary font-bold border border-lumiere-borderLight'
                  : 'bg-white/60 text-lumiere-textCaption'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};