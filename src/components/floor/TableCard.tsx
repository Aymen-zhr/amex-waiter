import React from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Utensils,
  Wine,
  Bell,
  Droplets,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { tapSpring } from '../../styles/motion';
import type { TableItem, TableStatus } from '../../types/table';

interface TableCardProps {
  table: TableItem;
  isSelected?: boolean;
  onSelect: (table: TableItem) => void;
  onAcknowledge?: (tableId: string) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  isSelected,
  onSelect,
  onAcknowledge,
}) => {
  // Format zone name for display capsule (e.g. MAIN_DINING -> MAIN DINING)
  const formattedZone = table.zone.replace('_', ' ');

  // Status pill configuration for Zone 1 Top Header Row
  const renderStatusPill = (status: TableStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lumiere-surface text-lumiere-textMuted border border-lumiere-borderLight font-mono text-[10px] font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lumiere-textCaption" />
            EMPTY
          </span>
        );
      case 'DINING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lumiere-emeraldLight text-lumiere-emerald border border-lumiere-emeraldBorder font-mono text-[10px] font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lumiere-emerald" />
            DINING
          </span>
        );
      case 'WAITING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lumiere-brassLight text-lumiere-brass border border-lumiere-border font-mono text-[10px] font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lumiere-brass" />
            PACING
          </span>
        );
      case 'REQUEST':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lumiere-amberLight text-lumiere-amber border border-lumiere-amberBorder font-mono text-[10px] font-semibold tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-lumiere-amber" />
            SERVICE
          </span>
        );
    }
  };

  // Leading Icon for Zone 2 Inner Inset Capsule
  const renderIcon = () => {
    if (table.status === 'AVAILABLE') {
      return <UtensilsCrossed className="w-5 h-5 text-lumiere-textMuted" />;
    }
    if (table.status === 'REQUEST') {
      if (table.serviceRequest?.type === 'WATER_REFILL') {
        return <Droplets className="w-5 h-5 text-lumiere-amber" />;
      }
      if (table.serviceRequest?.type === 'SOMMELIER') {
        return <Wine className="w-5 h-5 text-lumiere-brass" />;
      }
      return <Bell className="w-5 h-5 text-lumiere-amber animate-bounce" />;
    }
    if (table.status === 'WAITING') {
      return <Clock className="w-5 h-5 text-lumiere-brass" />;
    }
    // DINING
    return <Utensils className="w-5 h-5 text-lumiere-emerald" />;
  };

  // Center typography derivation
  const getCenterTitle = () => {
    if (table.status === 'AVAILABLE') {
      return 'Available';
    }
    if (table.status === 'REQUEST' && table.serviceRequest) {
      return table.serviceRequest.label;
    }
    if (table.guest?.name) {
      const parts = table.guest.name.split(' ');
      const lastName = parts.length > 1 ? parts[parts.length - 1] : parts[0];
      return `${lastName} Party (${table.guestCount || table.capacity}G)`;
    }
    return `Table ${table.tableNumber} (${table.guestCount || table.capacity}G)`;
  };

  const getCenterSubtitle = () => {
    if (table.status === 'AVAILABLE') {
      return `Capacity: ${table.capacity} Guests • Open`;
    }
    if (table.status === 'REQUEST' && table.serviceRequest) {
      const course = table.activeCourse ? table.activeCourse.split('•')[0].trim() : 'Seated';
      return `Pending ${table.serviceRequest.pendingSinceMinutes}m • ${course}`;
    }
    if (table.activeCourse) {
      return `${table.activeCourse} • Seated ${table.seatedMinutes || 0}m`;
    }
    return `Seated ${table.seatedMinutes || 0}m • Capacity: ${table.capacity}`;
  };

  // Bottom footer caption derivation
  const getFooterCaption = () => {
    if (table.nextReservation) {
      return `• Next: ${table.nextReservation.time} • ${table.nextReservation.partyName} (${table.nextReservation.guestCount}G)`;
    }
    if (table.seatedMinutes) {
      return `• Seated: ${table.seatedMinutes}m ago`;
    }
    return `• Open table for service`;
  };

  return (
    <motion.div
      whileTap={tapSpring.whileTap}
      transition={tapSpring.transition}
      onClick={() => onSelect(table)}
      className={`group relative bg-lumiere-card border rounded-3xl p-4 shadow-luxury flex flex-col justify-between transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'border-lumiere-textPrimary ring-2 ring-lumiere-textPrimary/10'
          : 'border-lumiere-border hover:border-lumiere-brass/50 hover:shadow-md'
      }`}
    >
      {/* =========================================
          ZONE 1: TOP HEADER ROW
          ========================================= */}
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-lumiere-borderLight">
          {/* Left: TABLE XX + Micro Room Tag */}
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-xl font-bold tracking-wide text-lumiere-textPrimary">
              TABLE {table.tableNumber}
            </span>
            <span className="font-mono text-[10px] uppercase text-lumiere-textMuted bg-lumiere-surface border border-lumiere-border px-2 py-0.5 rounded-full tracking-wider">
              {formattedZone}
            </span>
          </div>

          {/* Right: Live Status Pill */}
          <div>{renderStatusPill(table.status)}</div>
        </div>

        {/* =========================================
            ZONE 2: INNER INSET CAPSULE (CARD BODY)
            ========================================= */}
        <div className="rounded-2xl bg-lumiere-canvas border border-lumiere-border p-3.5 flex items-center justify-between gap-3 mt-3">
          {/* Leading Icon Tile (42x42px square-rounded) */}
          <div className="w-[42px] h-[42px] rounded-xl bg-white border border-lumiere-border flex items-center justify-center shrink-0 shadow-sm">
            {renderIcon()}
          </div>

          {/* Center Typography */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-lumiere-textPrimary truncate">
              {getCenterTitle()}
            </h4>
            <p className="text-[11px] font-mono text-lumiere-textCaption truncate mt-0.5 tabular-nums">
              {getCenterSubtitle()}
            </p>
          </div>

          {/* Trailing Action / Status Chip */}
          <div className="shrink-0">
            {table.status === 'AVAILABLE' && (
              <span className="text-lumiere-emerald bg-lumiere-emeraldLight font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md border border-lumiere-emeraldBorder inline-block">
                READY
              </span>
            )}

            {table.status === 'REQUEST' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAcknowledge?.(table.id);
                }}
                className="bg-lumiere-amber hover:bg-amber-700 active:scale-95 text-white font-mono text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm transition-all cursor-pointer"
                title="Acknowledge and clear service request"
              >
                Acknowledge
              </button>
            )}

            {table.status === 'DINING' && (
              <span className="font-mono text-[10px] text-lumiere-emerald bg-white/90 border border-lumiere-emeraldBorder/60 px-2 py-0.5 rounded-md font-semibold tracking-wider">
                ACTIVE
              </span>
            )}

            {table.status === 'WAITING' && (
              <span className="font-mono text-[10px] text-lumiere-brass bg-white/90 border border-lumiere-border px-2 py-0.5 rounded-md font-semibold tracking-wider">
                PACING
              </span>
            )}
          </div>
        </div>
      </div>

      {/* =========================================
          ZONE 3: BOTTOM FOOTER ROW
          ========================================= */}
      <div className="border-t border-lumiere-borderLight mt-3 pt-2.5 flex items-center justify-between">
        {/* Left Caption: Next reservation or seating duration */}
        <span className="text-xs font-mono text-lumiere-textMuted truncate mr-2 tabular-nums">
          {getFooterCaption()}
        </span>

        {/* Right Action Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(table);
          }}
          className="text-xs font-mono font-semibold text-lumiere-textPrimary hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Actions</span>
          <ChevronRight className="w-3.5 h-3.5 text-lumiere-brass" />
        </button>
      </div>
    </motion.div>
  );
};