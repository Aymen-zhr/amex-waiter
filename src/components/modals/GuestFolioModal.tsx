import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Printer,
  X,
  AlertTriangle,
  Check,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { tapSpring } from '../../styles/motion';
import type { TableItem } from '../../types/table';

interface GuestFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableItem | null;
  onOpenRunSheet?: (tableId: string) => void;
}

export const GuestFolioModal: React.FC<GuestFolioModalProps> = ({
  isOpen,
  onClose,
  table,
  onOpenRunSheet,
}) => {
  const [isPrinted, setIsPrinted] = useState(false);

  if (!table) return null;

  const tableNum = table.tableNumber;
  const couverts = table.guestCount || table.capacity || 2;
  const seatedMin = table.seatedMinutes ?? 45;
  const server = table.serverName || 'Marcus';
  const parsedTableNum = parseInt(tableNum, 10);
  const ticketNumber = `#40${80 + (isNaN(parsedTableNum) ? 86 : parsedTableNum)}`;

  // Degustation Course progression calculation
  const defaultCourses = [
    { num: 1, name: 'Amuse-Bouche' },
    { num: 2, name: 'Premier Cru' },
    { num: 3, name: 'Plat Principal' },
    { num: 4, name: 'Fromages de France' },
    { num: 5, name: 'Grand Dessert' },
  ];

  let currentCourseNum = 3;
  let totalCourses = 5;
  let currentCourseName = 'Plat Principal';

  if (table.activeCourse) {
    const match = table.activeCourse.match(/Course\s+(\d+)\s+of\s+(\d+)\s*•?\s*(.*)/i);
    if (match) {
      currentCourseNum = parseInt(match[1], 10);
      totalCourses = parseInt(match[2], 10);
      if (match[3]?.trim()) {
        currentCourseName = match[3].trim();
      }
    }
  }

  const coursesList = Array.from({ length: totalCourses }, (_, i) => {
    const num = i + 1;
    const defaultName = defaultCourses[i]?.name || `Course ${num}`;
    const name = num === currentCourseNum ? currentCourseName : defaultName;
    return {
      num,
      name,
      status: num < currentCourseNum ? 'completed' : num === currentCourseNum ? 'active' : 'pending',
    };
  });

  // Financial line items
  const menuPriceEach = 185.0;
  const menuTotal = couverts * menuPriceEach;
  const winePrice = 1450.0;
  const waterPrice = 30.0;

  const netSubtotal = menuTotal + winePrice + waterPrice;
  const serviceCharge = netSubtotal * 0.125;
  const grandTotal = netSubtotal + serviceCharge;

  const handlePrint = () => {
    setIsPrinted(true);
    setTimeout(() => setIsPrinted(false), 2500);
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
            1. HEADER ROW (TABLE XX • X COUVERTS)
            ========================================= */}
        <div className="flex items-start justify-between pb-5 border-b border-lumiere-borderLight">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-lumiere-textPrimary">
              TABLE {tableNum} • {couverts} COUVERTS
            </h2>
            <p className="font-mono text-xs text-lumiere-textMuted tabular-nums">
              Ticket {ticketNumber} • Seated {seatedMin}m • Server: {server}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenRunSheet && (
              <motion.button
                whileTap={tapSpring.whileTap}
                transition={tapSpring.transition}
                onClick={() => {
                  onClose();
                  onOpenRunSheet(table.id);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-lumiere-border bg-white text-xs font-mono text-lumiere-textMuted hover:text-lumiere-textPrimary hover:bg-lumiere-surface transition-colors cursor-pointer"
                title="View Table Run-Sheet"
              >
                <Calendar className="w-3.5 h-3.5 text-lumiere-brass" />
                <span>Run-Sheet</span>
              </motion.button>
            )}

            {/* Top-right Circular 44x44px Hit Target */}
            <motion.button
              whileTap={tapSpring.whileTap}
              transition={tapSpring.transition}
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-lumiere-surface border border-lumiere-border flex items-center justify-center text-lumiere-textPrimary hover:bg-lumiere-borderLight transition-colors cursor-pointer shrink-0"
              aria-label="Close Folio"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* =========================================
            2. DEGUSTATION COURSE STEPPER
            ========================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-lumiere-textCaption font-semibold">
              Degustation Pacing Timeline
            </span>
            <span className="font-mono text-xs text-lumiere-brass font-medium">
              Course {currentCourseNum} of {totalCourses}
            </span>
          </div>

          <div className="flex items-center justify-between relative py-2">
            {/* Hairline Connecting Rule behind dots */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-lumiere-border -translate-y-1/2 z-0" />

            {coursesList.map((c) => {
              const isCompleted = c.status === 'completed';
              const isActive = c.status === 'active';
              const isPending = c.status === 'pending';

              return (
                <div key={c.num} className="relative z-10 flex flex-col items-center">
                  {isCompleted && (
                    <div
                      className="w-6 h-6 rounded-full bg-lumiere-surface border border-lumiere-border flex items-center justify-center text-lumiere-textMuted shadow-xs"
                      title={`${c.name} (Completed)`}
                    >
                      <Check className="w-3.5 h-3.5 text-lumiere-emerald" />
                    </div>
                  )}

                  {isActive && (
                    <div className="px-3 py-1 rounded-full bg-lumiere-emeraldLight text-lumiere-emerald border border-lumiere-emeraldBorder font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-lumiere-emerald animate-pulse" />
                      <span>
                        Course {c.num} of {totalCourses} • {c.name}
                      </span>
                    </div>
                  )}

                  {isPending && (
                    <div
                      className="w-6 h-6 rounded-full bg-white border border-lumiere-borderLight flex items-center justify-center font-mono text-[11px] text-lumiere-textCaption"
                      title={`${c.name} (Pending)`}
                    >
                      {c.num}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            3. LINE ITEMS & DIETARY RESTRICTION PILLS
            ========================================= */}
        <div className="space-y-3 pt-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-lumiere-textCaption font-semibold block">
            Itemized Degustation Ledger
          </span>

          <div className="divide-y divide-lumiere-borderLight rounded-2xl border border-lumiere-border bg-lumiere-canvas/50 overflow-hidden">
            {/* Item 1: Degustation Menus */}
            <div className="p-4 flex flex-col gap-1.5 bg-white">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-lumiere-textPrimary">
                  {couverts}× Signature Degustation Menu
                </span>
                <span className="font-mono text-lumiere-textPrimary tabular-nums">
                  (${menuPriceEach.toFixed(2)} ea → ${menuTotal.toFixed(2)})
                </span>
              </div>

              {/* Dietary & Allergy Highlight Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-lumiere-amberLight text-lumiere-amber border border-lumiere-amberBorder text-[11px] font-mono font-medium">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  Strict Nut Allergy • Seat 3
                </span>
                {table.guest?.dietaryAllergies &&
                  table.guest.dietaryAllergies.map((allergy, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-lumiere-terracottaLight text-lumiere-terracotta border border-lumiere-terracottaBorder text-[11px] font-mono font-medium"
                    >
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      {allergy} Flagged
                    </span>
                  ))}
              </div>
            </div>

            {/* Item 2: Vintage Grand Cru Pairing */}
            <div className="p-4 flex items-center justify-between text-sm bg-white">
              <div>
                <span className="font-medium text-lumiere-textPrimary block">
                  1× 2018 Domaine de la Romanée-Conti
                </span>
                <span className="text-xs text-lumiere-textMuted font-mono">
                  Cellar Vault Bin #A-04 • Sommelier Poured
                </span>
              </div>
              <span className="font-mono font-medium text-lumiere-textPrimary tabular-nums">
                (${winePrice.toFixed(2)})
              </span>
            </div>

            {/* Item 3: Mineral Water Selection */}
            <div className="p-4 flex items-center justify-between text-sm bg-white">
              <span className="text-lumiere-textPrimary">
                3× Châteldon 1650 Sparkling Mineral Water (750ml)
              </span>
              <span className="font-mono font-medium text-lumiere-textPrimary tabular-nums">
                (${waterPrice.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* =========================================
            4. FINANCIAL LEDGER & TOTALS
            ========================================= */}
        <div className="p-5 rounded-2xl bg-lumiere-surface/80 border border-lumiere-borderLight space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-lumiere-textMuted">
            <span>Net Food & Beverage</span>
            <span className="tabular-nums font-medium text-lumiere-textPrimary">
              ${netSubtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-lumiere-textMuted">
            <span>12.5% Discretionary Service</span>
            <span className="tabular-nums font-medium text-lumiere-textPrimary">
              ${serviceCharge.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-lumiere-border flex items-baseline justify-between">
            <span className="font-serif text-lg font-bold text-lumiere-textPrimary">
              Grand Total
            </span>
            <span className="font-serif text-3xl font-bold text-lumiere-textPrimary tabular-nums tracking-tight">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* =========================================
            5. ACTION RIBBON (DISMISS & PRINT FOLIO)
            ========================================= */}
        <div className="pt-2 flex items-center justify-end gap-3">
          {/* Secondary Ghost Dismiss Button */}
          <motion.button
            whileTap={tapSpring.whileTap}
            transition={tapSpring.transition}
            onClick={onClose}
            className="px-5 py-3 rounded-full border border-lumiere-border text-lumiere-textMuted font-mono text-sm hover:text-lumiere-textPrimary hover:bg-lumiere-surface transition-colors cursor-pointer"
          >
            Dismiss
          </motion.button>

          {/* Primary Dark Pill: Print Folio / Receipt */}
          <motion.button
            whileTap={tapSpring.whileTap}
            transition={tapSpring.transition}
            onClick={handlePrint}
            className="px-6 py-3 rounded-full bg-lumiere-textPrimary text-lumiere-canvas font-mono text-sm font-semibold hover:bg-black flex items-center gap-2.5 cursor-pointer shadow-luxury transition-all"
          >
            {isPrinted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-lumiere-emerald" />
                <span>Ticket Printed</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>Print Folio / Receipt</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </ModalShell>
  );
};