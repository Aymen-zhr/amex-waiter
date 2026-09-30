import React from 'react';
import { Crown, AlertTriangle, Bell } from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { Badge } from '../common/Badge';
import { ActionButton } from '../common/ActionButton';
import type { TableItem, TableStatus } from '../../types/table';

interface GuestFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableItem | null;
  onUpdateStatus?: (status: TableStatus) => void;
  onAcknowledge?: (tableId: string) => void;
}

export const GuestFolioModal: React.FC<GuestFolioModalProps> = ({
  isOpen,
  onClose,
  table,
  onUpdateStatus,
  onAcknowledge,
}) => {
  if (!table) return null;

  const guest = table.guest;
  const formattedZone = table.zone.replace('_', ' ');

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={`TABLE ${table.tableNumber} â€¢ Guest Dossier`}
      subtitle={`${formattedZone} â€¢ Capacity: ${table.capacity} Persons`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Active Service Request Banner if present */}
        {table.status === 'REQUEST' && table.serviceRequest && (
          <div className="p-4 rounded-2xl bg-lumiere-amberLight border border-lumiere-amberBorder flex items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-lumiere-amberBorder flex items-center justify-center text-lumiere-amber shrink-0 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-lumiere-amber">
                  Active Service Request: {table.serviceRequest.label}
                </h4>
                <p className="text-xs text-lumiere-textMuted font-mono">
                  Pending for {table.serviceRequest.pendingSinceMinutes} minutes at Table {table.tableNumber}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onAcknowledge?.(table.id);
                onClose();
              }}
              className="bg-lumiere-amber hover:bg-amber-700 text-white font-mono text-xs px-4 py-2 rounded-full font-bold shadow-sm transition-all cursor-pointer shrink-0"
            >
              Acknowledge
            </button>
          </div>
        )}

        {/* VIP & Guest Header Card */}
        <div className="p-5 rounded-2xl bg-lumiere-surface/80 border border-lumiere-borderLight flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {guest?.vipTier?.includes('Centurion') && (
                <Crown className="w-4 h-4 text-lumiere-brass shrink-0" />
              )}
              <h3 className="font-serif text-2xl font-medium text-lumiere-textPrimary">
                {guest?.name || (table.guestCount ? `Party of ${table.guestCount}` : 'Available Table')}
              </h3>
            </div>
            {guest?.vipTier && (
              <Badge variant="brass" size="sm">
                {guest.vipTier}
              </Badge>
            )}
            {guest?.spendToDate && (
              <p className="text-xs font-mono text-lumiere-textMuted mt-1">
                LumiÃ¨re Lifetime Spend: <span className="font-semibold text-lumiere-textPrimary">{guest.spendToDate}</span>
              </p>
            )}
          </div>

          <div className="text-right">
            <span className="font-mono text-xs uppercase tracking-wider text-lumiere-textCaption block">
              Folio Total
            </span>
            <span className="font-mono text-xl font-bold text-lumiere-textPrimary">
              {table.totalBill || 'â‚¬ 0,00'}
            </span>
            {table.serverName && (
              <span className="text-[11px] font-mono text-lumiere-textCaption block mt-0.5">
                Server: {table.serverName}
              </span>
            )}
          </div>
        </div>

        {/* Dietary Allergies Warning */}
        {guest?.dietaryAllergies && guest.dietaryAllergies.length > 0 && (
          <div className="p-4 rounded-xl bg-lumiere-terracottaLight border border-lumiere-terracottaBorder">
            <div className="flex items-center gap-2 text-lumiere-terracotta text-xs font-semibold uppercase tracking-wider font-mono">
              <AlertTriangle className="w-4 h-4" />
              Strict Dietary Precaution
            </div>
            <p className="text-sm font-medium text-lumiere-textPrimary mt-1">
              Guest marked allergic to: {guest.dietaryAllergies.join(', ')}
            </p>
            <p className="text-xs text-lumiere-textMuted mt-0.5">
              Pass chef notification confirmed.
            </p>
          </div>
        )}

        {/* Course Progression Tracker */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-widest text-lumiere-textCaption mb-3">
            Active Dining Course Cadence
          </h4>
          <div className="p-4 rounded-xl bg-white border border-lumiere-border flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-lumiere-textPrimary block">
                {table.activeCourse || 'Table Ready for Seating'}
              </span>
              <span className="text-xs font-mono text-lumiere-textMuted">
                Seated Duration: {table.seatedMinutes ? `${table.seatedMinutes} minutes` : 'Not seated'}
              </span>
            </div>
            {table.nextReservation && (
              <div className="text-right border-l border-lumiere-borderLight pl-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-lumiere-textCaption block">
                  Next Turnover
                </span>
                <span className="text-xs font-mono font-bold text-lumiere-textPrimary">
                  {table.nextReservation.time} â€¢ {table.nextReservation.partyName} ({table.nextReservation.guestCount}G)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Notes & Sommelier Pairings */}
        {guest?.notes && (
          <div className="p-4 rounded-xl bg-white border border-lumiere-border space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lumiere-textCaption">
              Service Notes
            </span>
            <p className="text-xs text-lumiere-textPrimary">{guest.notes}</p>
          </div>
        )}

        {/* Table Ergonomic Actions */}
        <div className="pt-4 border-t border-lumiere-borderLight flex flex-wrap gap-2.5 justify-end">
          <ActionButton
            variant="secondary"
            size="sm"
            onClick={() => {
              onUpdateStatus?.('WAITING');
              onClose();
            }}
          >
            Pace Courses
          </ActionButton>
          <ActionButton
            variant="brass"
            size="sm"
            onClick={() => {
              onUpdateStatus?.('DINING');
              onClose();
            }}
          >
            Summon Sommelier
          </ActionButton>
          <ActionButton
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Close Folio
          </ActionButton>
        </div>
      </div>
    </ModalShell>
  );
};