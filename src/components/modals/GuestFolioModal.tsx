import React from 'react';
import { Crown, AlertTriangle } from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { Badge } from '../common/Badge';
import { ActionButton } from '../common/ActionButton';
import type { TableData } from '../../types/table';

interface GuestFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableData | null;
  onUpdateStatus?: (status: TableData['status']) => void;
}

export const GuestFolioModal: React.FC<GuestFolioModalProps> = ({
  isOpen,
  onClose,
  table,
  onUpdateStatus,
}) => {
  if (!table) return null;

  const guest = table.guest;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={`Table ${table.tableNumber} • Guest Folio`}
      subtitle={`${table.zone.replace('-', ' ')} • Capacity ${table.capacity} Persons`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* VIP & Guest Header Card */}
        <div className="p-5 rounded-2xl bg-lumiere-surface/80 border border-lumiere-borderLight flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {guest?.vipTier?.includes('Centurion') && (
                <Crown className="w-4 h-4 text-lumiere-brass shrink-0" />
              )}
              <h3 className="font-serif text-2xl font-medium text-lumiere-textPrimary">
                {guest?.name || 'Walk-in Guest'}
              </h3>
            </div>
            {guest?.vipTier && (
              <Badge variant="brass" size="sm">
                {guest.vipTier}
              </Badge>
            )}
            {guest?.spendToDate && (
              <p className="text-xs font-mono text-lumiere-textMuted mt-1">
                Lumière Lifetime Spend: <span className="font-semibold text-lumiere-textPrimary">{guest.spendToDate}</span>
              </p>
            )}
          </div>

          <div className="text-right">
            <span className="font-mono text-xs uppercase tracking-wider text-lumiere-textCaption block">
              Folio Ledger
            </span>
            <span className="font-mono text-xl font-bold text-lumiere-textPrimary">
              {table.totalBill || '€ 0,00'}
            </span>
          </div>
        </div>

        {/* Dietary Allergies & Pre-requisites */}
        {guest?.dietaryAllergies && guest.dietaryAllergies.length > 0 && (
          <div className="p-4 rounded-xl bg-lumiere-terracottaLight border border-lumiere-terracottaBorder">
            <div className="flex items-center gap-2 text-lumiere-terracotta text-xs font-semibold uppercase tracking-wider font-mono">
              <AlertTriangle className="w-4 h-4" />
              Severe Dietary Alert
            </div>
            <p className="text-sm font-medium text-lumiere-textPrimary mt-1">
              Guest marked allergic to: {guest.dietaryAllergies.join(', ')}
            </p>
            <p className="text-xs text-lumiere-textMuted mt-0.5">
              Requires culinary pass verification prior to amuse-bouche firing.
            </p>
          </div>
        )}

        {/* Course Progression Tracker */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-widest text-lumiere-textCaption mb-3">
            Course Progression
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Amuse', active: true, done: true },
              { name: 'Premier', active: table.currentCourse === 'Premier Cru', done: true },
              { name: 'Principal', active: table.currentCourse === 'Principal', done: false },
              { name: 'Dessert', active: table.currentCourse === 'Grand Dessert', done: false },
            ].map((course, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  course.active
                    ? 'bg-lumiere-brassLight border-lumiere-border text-lumiere-brass font-semibold shadow-sm'
                    : course.done
                    ? 'bg-white border-lumiere-borderLight text-lumiere-textMuted'
                    : 'bg-lumiere-surface/40 border-dashed border-lumiere-borderLight text-lumiere-textCaption'
                }`}
              >
                <span className="block text-[10px] font-mono tracking-wider uppercase mb-1">
                  0{idx + 1}
                </span>
                <span className="text-xs font-medium">{course.name}</span>
              </div>
            ))}
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
            onClick={() => onUpdateStatus?.('pacing')}
          >
            Pace Courses
          </ActionButton>
          <ActionButton
            variant="brass"
            size="sm"
            onClick={() => onUpdateStatus?.('seated')}
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