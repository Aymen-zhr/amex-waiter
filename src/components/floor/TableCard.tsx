import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, AlertTriangle, Crown, Utensils } from 'lucide-react';
import { Badge, type BadgeVariant } from '../common/Badge';
import { tapSpring } from '../../styles/motion';
import type { TableData } from '../../types/table';

interface TableCardProps {
  table: TableData;
  isSelected?: boolean;
  onSelect: (table: TableData) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  isSelected,
  onSelect,
}) => {
  const statusBadgeConfig: Record<
    TableData['status'],
    { label: string; variant: BadgeVariant; dot: boolean }
  > = {
    seated: { label: 'Seated', variant: 'emerald', dot: true },
    alert: { label: 'Attention', variant: 'amber', dot: true },
    pacing: { label: 'Coursing', variant: 'brass', dot: true },
    available: { label: 'Available', variant: 'neutral', dot: false },
    reserved: { label: 'Reserved', variant: 'neutral', dot: false },
    turnover: { label: 'Turnover', variant: 'terracotta', dot: true },
  };

  const currentBadge = statusBadgeConfig[table.status];
  const isOccupied = table.status !== 'available' && table.status !== 'reserved';

  return (
    <motion.div
      whileTap={tapSpring.whileTap}
      transition={tapSpring.transition}
      onClick={() => onSelect(table)}
      className={`group relative p-5 bg-white rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[210px] shadow-luxury ${
        isSelected
          ? 'border-lumiere-textPrimary ring-2 ring-lumiere-textPrimary/10'
          : 'border-lumiere-border hover:border-lumiere-brass/50 hover:shadow-md'
      }`}
    >
      {/* Top Bar: Table Number & Status */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-medium tracking-tight text-lumiere-textPrimary">
              Table {table.tableNumber}
            </span>
            <span className="text-xs text-lumiere-textCaption uppercase tracking-wider font-mono">
              Cap. {table.capacity}
            </span>
          </div>
          <span className="text-[11px] text-lumiere-textMuted tracking-wide capitalize">
            {table.zone.replace('-', ' ')}
          </span>
        </div>

        <Badge variant={currentBadge.variant} dot={currentBadge.dot} size="sm">
          {currentBadge.label}
        </Badge>
      </div>

      {/* Middle: Guest Details or Vacant State */}
      <div className="my-3 space-y-2">
        {isOccupied && table.guest ? (
          <div>
            <div className="flex items-center gap-1.5">
              {table.guest.vipTier === 'AMEX Centurion' && (
                <Crown className="w-3.5 h-3.5 text-lumiere-brass shrink-0" />
              )}
              {table.guest.vipTier === 'AMEX Platinum' && (
                <Crown className="w-3.5 h-3.5 text-lumiere-textMuted shrink-0" />
              )}
              <h4 className="text-sm font-semibold text-lumiere-textPrimary truncate">
                {table.guest.name}
              </h4>
            </div>

            {/* VIP Centurion / Platinum Banner */}
            {table.guest.vipTier && table.guest.vipTier !== 'Standard' && (
              <span className="inline-block mt-0.5 text-[10px] uppercase font-mono tracking-widest text-lumiere-brass font-medium">
                {table.guest.vipTier}
              </span>
            )}

            {/* Dietary Allergies Warning */}
            {table.guest.dietaryAllergies && table.guest.dietaryAllergies.length > 0 && (
              <div className="flex items-center gap-1 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-lumiere-terracottaLight text-lumiere-terracotta border border-lumiere-terracottaBorder text-[10px] font-mono font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {table.guest.dietaryAllergies.join(', ')}
                </span>
              </div>
            )}
          </div>
        ) : table.status === 'reserved' && table.guest ? (
          <div>
            <span className="text-xs font-medium text-lumiere-textPrimary">
              Res: {table.guest.name}
            </span>
            <p className="text-[11px] text-lumiere-textMuted">
              {table.guest.notes || 'Arriving shortly'}
            </p>
          </div>
        ) : (
          <div className="py-2 text-center text-xs text-lumiere-textCaption italic">
            Table ready for seating
          </div>
        )}
      </div>

      {/* Active Service Alert */}
      {table.activeAlert && (
        <div className="mb-2 px-2.5 py-1.5 rounded-lg bg-lumiere-amberLight border border-lumiere-amberBorder flex items-center gap-1.5 text-xs text-lumiere-amber font-medium">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{table.activeAlert}</span>
        </div>
      )}

      {/* Bottom Pacing & Metadata */}
      <div className="pt-2.5 border-t border-lumiere-borderLight flex items-center justify-between text-xs text-lumiere-textMuted">
        {isOccupied ? (
          <>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Utensils className="w-3 h-3 text-lumiere-brass" />
              <span className="text-lumiere-textPrimary font-medium">
                {table.currentCourse || 'Amuse'}
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-lumiere-textCaption tabular-nums">
              <Clock className="w-3 h-3" />
              <span>{table.courseStartTime || table.seatedTime}</span>
            </div>
          </>
        ) : (
          <>
            <span className="text-[11px] text-lumiere-textCaption">Assigned: {table.serverName}</span>
            <div className="flex items-center gap-1 text-[11px] text-lumiere-textCaption">
              <Users className="w-3 h-3" />
              <span>{table.capacity}p</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};