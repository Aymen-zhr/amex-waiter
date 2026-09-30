import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Printer,
  X,
  AlertTriangle,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { tapSpring } from '../../styles/motion';
import type { TableItem } from '../../types/table';

interface GuestFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableItem | null;
}

export const GuestFolioModal: React.FC<GuestFolioModalProps> = ({
  isOpen,
  onClose,
  table,
}) => {
  const [isPrinted, setIsPrinted] = useState(false);

  if (!table) return null;

  const tableNum = table.tableNumber;
  const couverts = table.guestCount || table.capacity;
  const seatedMin = table.seatedMinutes || 45;
  const server = table.serverName || 'Marcus';
  const ticketNumber = `#40${80 + parseInt(tableNum, 10) || 86}`;

  // Degustation Course progression calculation
  const degustationCourses = [
    { num: 1, name: 'Amuse-Bouche', status: 'completed' },
    { num: 2, name: 'Premier Cru', status: 'completed' },
    { num: 3, name: 'Plat Principal', status: 'active' },
    { num: 4, name: 'Fromages de France', status: 'pending' },
    { num: 5, name: 'Grand Dessert', status: 'pending' },
  ];

  // Adjust active course based on table activeCourse string if present
  let activeCourseIndex = 2; // Default Course 3
  if (table.activeCourse) {
    if (table.activeCourse.includes('Course 1')) activeCourseIndex = 0;
    else if (table.activeCourse.includes('Course 2')) activeCourseIndex = 1;
    else if (table.activeCourse.includes('Course 3')) activeCourseIndex = 2;
    else if (table.activeCourse.includes('Course 4')) activeCourseIndex = 3;
    else if (table.activeCourse.includes('Course 5') || table.activeCourse.includes('Course 6')) activeCourseIndex = 4;
  }

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
            1. HEADER ROW (TABLE XX â€¢ X COUVERTS)
            ========================================= */}
        <div className="flex items-start justify-between pb-5 border-b border-lumiere-borderLight">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-lumiere-textPrimary">
              TABLE {tableNum} â€¢ {couverts} COUVERTS
            </h2>
            <p className="font-mono text-xs text-lumiere-textMuted tabular-nums">
              Ticket {ticketNumber} â€¢ Seated {seatedMin}m â€¢ Server: {server}
            </p>
          </div>

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

        {/* =========================================
            2. DEGUSTATION COURSE STEPPER
            ========================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-lumiere-textCaption font-semibold">
              Degustation Pacing Timeline
            </span>
            <span className="font-mono text-xs text-lumiere-brass font-medium">
              Course {activeCourseIndex + 1} of 5
            </span>
          </div>

          <div className="flex items-center justify-between relative py-2">
            {/* Hairline Connecting Rule behind dots */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-lumiere-border -translate-y-1/2 z-0" />

            {degustationCourses.map((c, idx) => {
              const isCompleted = idx < activeCourseIndex;
              const isActive = idx === activeCourseIndex;
              const isPending = idx > activeCourseIndex;

              return (
                <div key={c.num} className="relative z-10 flex flex-col items-center">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-lumiere-surface border border-lumiere-border flex items-center justify-center text-lumiere-textMuted shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {isActive && (
                    <div className="px-3 py-1 rounded-full bg-lumiere-emeraldLight text-lumiere-emerald border border-lumiere-emeraldBorder font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-lumiere-emerald animate-pulse" />
                      <span>
                        Course {c.num} of 5 â€¢ {c.name}
                      </span>
                    </div>
                  )}

                  {isPending && (
                    <div className="w-6 h-6 rounded-full bg-white border border-lumiere-borderLight flex items-center justify-center font-mono text-[11px] text-lumiere-textCaption">
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
                  {couverts}Ã— Signature Degustation Menu
                </span>
                <span className="font-mono text-lumiere-textPrimary tabular-nums">
                  (${menuPriceEach.toFixed(2)} ea â†’ ${menuTotal.toFixed(2)})
                </span>
              </div>

              {/* Dietary & Allergy Highlight Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-lumiere-amberLight text-lumiere-amber border border-lumiere-amberBorder text-[11px] font-mono font-medium">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  âš ï¸ Strict Nut Allergy â€¢ Seat 3
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
                  1Ã— 2018 Domaine de la RomanÃ©e-Conti
                </span>
                <span className="text-xs text-lumiere-textMuted font-mono">
                  Cellar Vault Bin #A-04 â€¢ Sommelier Poured
                </span>
              </div>
              <span className="font-mono font-medium text-lumiere-textPrimary tabular-nums">
                (${winePrice.toFixed(2)})
              </span>
            </div>

            {/* Item 3: Mineral Water Selection */}
            <div className="p-4 flex items-center justify-between text-sm bg-white">
              <span className="text-lumiere-textPrimary">
                3Ã— ChÃ¢teldon 1650 Sparkling Mineral Water (750ml)
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