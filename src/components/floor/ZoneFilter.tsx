import React from 'react';
import { motion } from 'framer-motion';
import { tabLayoutTransition } from '../../styles/motion';
import type { DiningZone } from '../../types/table';

interface ZoneFilterProps {
  activeZone: DiningZone;
  onSelectZone: (zone: DiningZone) => void;
  counts: Record<DiningZone, number>;
}

const ZONES: { id: DiningZone; label: string }[] = [
  { id: 'all', label: 'All Quarters' },
  { id: 'main-dining', label: 'Main Dining Room' },
  { id: 'terrace', label: 'Veranda & Terrace' },
  { id: 'private-salon', label: 'Salon Privé' },
  { id: 'cellar-vault', label: 'Cellar Vault' },
];

export const ZoneFilter: React.FC<ZoneFilterProps> = ({
  activeZone,
  onSelectZone,
  counts,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-lumiere-surface/80 rounded-2xl border border-lumiere-borderLight overflow-x-auto no-scrollbar">
      {ZONES.map((zone) => {
        const isActive = activeZone === zone.id;
        const count = counts[zone.id] ?? 0;

        return (
          <button
            key={zone.id}
            onClick={() => onSelectZone(zone.id)}
            className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-colors duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
              isActive
                ? 'text-lumiere-textPrimary'
                : 'text-lumiere-textMuted hover:text-lumiere-textPrimary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activePill"
                transition={tabLayoutTransition}
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-lumiere-border"
              />
            )}
            <span className="relative z-10">{zone.label}</span>
            <span
              className={`relative z-10 px-1.5 py-0.5 rounded-md font-mono text-[10px] ${
                isActive
                  ? 'bg-lumiere-surface text-lumiere-textPrimary font-semibold'
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