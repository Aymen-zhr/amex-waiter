import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ChevronRight,
  FileText,
  Crown,
} from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { tapSpring } from '../../styles/motion';
import type { TableItem } from '../../types/table';

interface RunSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableItem | null;
  onOpenFolio?: (tableId: string) => void;
}

export const RunSheetModal: React.FC<RunSheetModalProps> = ({
  isOpen,
  onClose,
  table,
  onOpenFolio,
}) => {
  if (!table) return null;

  const tableNum = table.tableNumber || '02';
  const tableId = table.id || 'table-02';
  const capacity = table.capacity || 4;
  const zoneName = table.zone ? table.zone.replace('_', ' ') : 'MAIN DINING';
  const server = table.serverName || 'Marcus';
  const nextRes = table.nextReservation || {
    time: '21:30',
    partyName: 'Mme. Laurent',
    guestCount: 4,
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      showDefaultHeader={false}
      maxWidth="max-w-2xl"
    >
      <div className="p-6 lg:p-8 bg-lumiere-card flex flex-col gap-6">
        {/* =========================================
            1. HEADER ROW (TABLE XX • RUN SHEET)
            ========================================= */}
        <div className="flex items-start justify-between pb-5 border-b border-lumiere-borderLight">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-lumiere-textPrimary">
              TABLE {tableNum} • RUN-SHEET & SCHEDULE
            </h2>
            <p className="font-mono text-xs text-lumiere-textMuted uppercase tracking-wider">
              {zoneName} • {capacity} Couverts • Service du Soir
            </p>
          </div>

          {/* Top-right Circular 44x44px Hit Target */}
          <motion.button
            whileTap={tapSpring.whileTap}
            transition={tapSpring.transition}
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-lumiere-surface border border-lumiere-border flex items-center justify-center text-lumiere-textPrimary hover:bg-lumiere-borderLight transition-colors cursor-pointer shrink-0"
            aria-label="Close Run Sheet"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* =========================================
            2. VERTICAL CHRONOLOGICAL SCHEDULE
            ========================================= */}
        <div className="space-y-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-lumiere-textCaption font-semibold block">
            Turnover Timeline & Reservations
          </span>

          {/* Turn 1: Past Seating (17:30 - 19:15) */}
          <div className="p-4 rounded-xl border border-lumiere-border bg-lumiere-canvas/60 opacity-60 flex flex-col gap-1.5 transition-opacity hover:opacity-90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-lumiere-textCaption px-2 py-0.5 rounded bg-white border border-lumiere-borderLight">
                  17:30 – 19:15
                </span>
                <span className="font-medium text-xs text-lumiere-textPrimary">
                  Turn 1 • M. Dupont (2G)
                </span>
              </div>
              <span className="font-mono text-[11px] text-lumiere-emerald font-semibold">
                Completed
              </span>
            </div>
            <p className="text-xs text-lumiere-textMuted font-mono">
              Folio #4071 • Settled ($380.00) • Two-course pre-theatre menu
            </p>
          </div>

          {/* Turn 2: Current Active Seating (19:30 - Present) */}
          <div className="p-5 rounded-2xl border border-lumiere-border border-l-4 border-l-lumiere-emerald bg-lumiere-surface shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-white bg-lumiere-emerald px-2.5 py-1 rounded-md">
                  19:30 – Present
                </span>
                <span className="font-serif text-lg font-bold text-lumiere-textPrimary">
                  Active Dining • Turn 2
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-lumiere-emerald bg-lumiere-emeraldLight border border-lumiere-emeraldBorder px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lumiere-emerald animate-pulse" />
                Live Seating
              </span>
            </div>

            {/* Guest VIP Notes */}
            <div className="p-3 rounded-xl bg-white border border-lumiere-border space-y-1">
              <div className="flex items-center gap-1.5 text-lumiere-brass font-mono text-[11px] font-semibold">
                <Crown className="w-3.5 h-3.5" />
                <span>VIP Regular • Champagne on arrival • Anniversary</span>
              </div>
              <p className="text-xs text-lumiere-textPrimary">
                {table.guest?.name
                  ? `${table.guest.name} party seated for degustation experience.${table.guest.notes ? ` ${table.guest.notes}` : ''}`
                  : 'Celebrating 25th anniversary. Pre-poured 2012 Dom Pérignon.'}
              </p>
            </div>

            {/* Server Attribution & Live Folio Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
              <div className="font-mono text-lumiere-textMuted">
                Server Lead: <span className="font-semibold text-lumiere-textPrimary">{server}</span> • Sommelier: <span className="font-semibold text-lumiere-textPrimary">Elena</span>
              </div>

              {/* Quick Action: Open Live Folio Button */}
              <motion.button
                whileTap={tapSpring.whileTap}
                transition={tapSpring.transition}
                onClick={() => {
                  onClose();
                  onOpenFolio?.(tableId);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-lumiere-textPrimary text-white font-mono text-xs font-semibold hover:bg-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer self-start sm:self-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Live Folio</span>
                <ChevronRight className="w-3.5 h-3.5 text-lumiere-brass" />
              </motion.button>
            </div>
          </div>

          {/* Turn 3: Upcoming Booking (21:30) */}
          <div className="p-4 rounded-xl border border-dashed border-lumiere-border bg-white flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-lumiere-textPrimary px-2 py-0.5 rounded bg-lumiere-surface">
                  {nextRes.time}
                </span>
                <span className="font-medium text-xs text-lumiere-textPrimary">
                  Booking: {nextRes.time} • {nextRes.partyName} ({nextRes.guestCount}G)
                </span>
              </div>
              <span className="font-mono text-[11px] text-lumiere-brass font-medium">
                Confirmed
              </span>
            </div>
            <p className="text-xs text-lumiere-textMuted">
              Requested Window Section • Amex Concierge reservation • High-priority pacing
            </p>
          </div>
        </div>

        {/* =========================================
            3. FOOTER DISMISS ACTION
            ========================================= */}
        <div className="pt-2 flex justify-end">
          <motion.button
            whileTap={tapSpring.whileTap}
            transition={tapSpring.transition}
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-lumiere-border text-lumiere-textPrimary font-mono text-xs font-semibold hover:bg-lumiere-surface transition-colors cursor-pointer"
          >
            Close Run-Sheet
          </motion.button>
        </div>
      </div>
    </ModalShell>
  );
};