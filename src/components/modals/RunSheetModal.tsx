import React from 'react';
import { ChefHat } from 'lucide-react';
import { ModalShell } from '../common/ModalShell';
import { Badge } from '../common/Badge';
import { ActionButton } from '../common/ActionButton';

interface RunSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RunSheetModal: React.FC<RunSheetModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Evening Service Run Sheet"
      subtitle="Shift: Service du Soir • 20:00 - 23:30"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Service Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-lumiere-surface border border-lumiere-borderLight">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lumiere-textCaption">
              Total Covers Booked
            </span>
            <span className="font-mono text-2xl font-bold text-lumiere-textPrimary block mt-1">
              46 Covers
            </span>
            <span className="text-[11px] text-lumiere-emerald font-medium">
              100% Station Capacity
            </span>
          </div>

          <div className="p-4 rounded-xl bg-lumiere-surface border border-lumiere-borderLight">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lumiere-textCaption">
              AMEX Centurion VIPs
            </span>
            <span className="font-mono text-2xl font-bold text-lumiere-brass block mt-1">
              4 Tables
            </span>
            <span className="text-[11px] text-lumiere-textMuted">
              Dedicated Sommelier escort
            </span>
          </div>

          <div className="p-4 rounded-xl bg-lumiere-surface border border-lumiere-borderLight">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lumiere-textCaption">
              Average Turnover Pacing
            </span>
            <span className="font-mono text-2xl font-bold text-lumiere-textPrimary block mt-1">
              2h 15m
            </span>
            <span className="text-[11px] text-lumiere-textMuted">
              Optimal 5-course cadence
            </span>
          </div>
        </div>

        {/* 86'd Kitchen Notices */}
        <div className="p-4 rounded-xl bg-lumiere-terracottaLight border border-lumiere-terracottaBorder space-y-1">
          <div className="flex items-center gap-2 text-lumiere-terracotta text-xs font-semibold uppercase tracking-wider font-mono">
            <ChefHat className="w-4 h-4" />
            Kitchen Pass 86'd Announcement
          </div>
          <p className="text-xs text-lumiere-textPrimary">
            <strong>Saint-Jacques de plongée</strong> are 86'd for the rest of evening service due to morning storm supply shortages. Replace with Langoustines Royales pairing.
          </p>
        </div>

        {/* Service Schedule Breakdown */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-widest text-lumiere-textCaption mb-3">
            Seating Schedule Highlights
          </h4>
          <div className="space-y-2">
            {[
              { time: '20:15', table: 'Table 04', party: 'Ambassador Zhao (6 covers)', tier: 'Centurion', note: 'Strict quiet positioning' },
              { time: '20:30', table: 'Table 14', party: 'Mme. Claudine Arnault (4 covers)', tier: 'Platinum', note: 'Vintage Krug pre-chilled' },
              { time: '21:00', table: 'Salon Privé', party: 'The Syndicate (10 covers)', tier: 'Centurion', note: 'Grand Tasting Menu' },
            ].map((res, i) => (
              <div
                key={i}
                className="p-3.5 bg-white rounded-xl border border-lumiere-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-lumiere-textPrimary px-2 py-1 rounded bg-lumiere-surface">
                    {res.time}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-lumiere-textPrimary">
                      {res.party}
                    </span>
                    <p className="text-xs text-lumiere-textMuted">
                      {res.table} • {res.note}
                    </p>
                  </div>
                </div>
                <Badge variant="brass" size="sm">
                  {res.tier}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <ActionButton variant="primary" size="sm" onClick={onClose}>
            Acknowledge Run Sheet
          </ActionButton>
        </div>
      </div>
    </ModalShell>
  );
};