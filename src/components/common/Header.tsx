import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, FileText, Wifi, BatteryCharging, Sparkles } from 'lucide-react';
import { Badge } from './Badge';
import { tapSpring } from '../../styles/motion';
import { useAlertStore } from '../../store/useAlertStore';
import { useFloorStore } from '../../store/useFloorStore';

interface HeaderProps {
  onOpenRunSheet?: () => void;
  onOpenCellar?: () => void;
  onOpenAlerts?: () => void;
  activeView: 'floor' | 'dispatch' | 'cellar';
  setActiveView: (view: 'floor' | 'dispatch' | 'cellar') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRunSheet,
  onOpenAlerts,
  activeView,
  setActiveView,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('20:00:00');
  const alerts = useAlertStore((state) => state.alerts);
  const tables = useFloorStore((state) => state.tables);

  // Active requests from tables + unread alerts
  const tableRequests = tables.filter((t) => t.status === 'REQUEST').length;
  const unreadAlerts = alerts.filter((a) => !a.isRead).length + tableRequests;

  const activeCovers = tables
    .filter((t) => t.status === 'DINING' || t.status === 'WAITING' || t.status === 'REQUEST')
    .reduce((acc, t) => acc + (t.guestCount || t.guest?.covers || 0), 0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-18 px-6 bg-white/95 backdrop-blur border-b border-lumiere-border flex items-center justify-between shrink-0 select-none">
      {/* Brand & Station Indicator */}
      <div className="flex items-center gap-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl font-medium tracking-tight text-lumiere-textPrimary flex items-center gap-1.5">
            LUMIÈRE
            <Sparkles className="w-3.5 h-3.5 text-lumiere-brass inline-block -translate-y-1" />
          </span>
          <span className="text-[11px] font-mono tracking-widest text-lumiere-textCaption uppercase">
            STATION OS • R19
          </span>
        </div>

        {/* View Switcher Pills */}
        <div className="hidden md:flex items-center p-1 bg-lumiere-surface rounded-xl border border-lumiere-borderLight">
          <button
            onClick={() => setActiveView('floor')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'floor'
                ? 'bg-white text-lumiere-textPrimary shadow-sm'
                : 'text-lumiere-textMuted hover:text-lumiere-textPrimary'
            }`}
          >
            Floor Plan
          </button>
          <button
            onClick={() => setActiveView('dispatch')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'dispatch'
                ? 'bg-white text-lumiere-textPrimary shadow-sm'
                : 'text-lumiere-textMuted hover:text-lumiere-textPrimary'
            }`}
          >
            Kitchen Dispatch
          </button>
          <button
            onClick={() => setActiveView('cellar')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'cellar'
                ? 'bg-white text-lumiere-textPrimary shadow-sm'
                : 'text-lumiere-textMuted hover:text-lumiere-textPrimary'
            }`}
          >
            Cellar Vault
          </button>
        </div>
      </div>

      {/* Center Covers Counter */}
      <div className="hidden lg:flex items-center gap-5 px-4 py-1.5 bg-lumiere-surface rounded-full border border-lumiere-borderLight">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lumiere-emerald animate-pulse" />
          <span className="text-xs text-lumiere-textMuted">Active Dining:</span>
          <span className="text-xs font-mono font-medium text-lumiere-textPrimary">
            {activeCovers} Covers
          </span>
        </div>
        <div className="w-px h-3.5 bg-lumiere-border" />
        <div className="flex items-center gap-2">
          <Badge variant="brass" size="sm">
            Service Étoilé
          </Badge>
        </div>
      </div>

      {/* Tablet Diagnostics & Actions */}
      <div className="flex items-center gap-3">
        {/* Tablet Clock in Tabular Mono */}
        <div className="px-3 py-1.5 bg-lumiere-surface rounded-lg border border-lumiere-borderLight font-mono text-xs font-medium text-lumiere-textPrimary tabular-nums">
          {currentTime}
        </div>

        {/* Run Sheet Trigger */}
        <motion.button
          whileTap={tapSpring.whileTap}
          transition={tapSpring.transition}
          onClick={onOpenRunSheet}
          className="h-10 px-3.5 rounded-xl border border-lumiere-border bg-white text-xs font-medium text-lumiere-textPrimary flex items-center gap-2 hover:bg-lumiere-surface transition-colors shadow-sm"
        >
          <FileText className="w-3.5 h-3.5 text-lumiere-textMuted" />
          <span className="hidden sm:inline">Run Sheet</span>
        </motion.button>

        {/* Alert Notification Button */}
        <motion.button
          whileTap={tapSpring.whileTap}
          transition={tapSpring.transition}
          onClick={onOpenAlerts}
          className="relative h-10 w-10 rounded-xl border border-lumiere-border bg-white flex items-center justify-center hover:bg-lumiere-surface transition-colors shadow-sm"
          aria-label="Service alerts"
        >
          <Bell className="w-4 h-4 text-lumiere-textPrimary" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lumiere-amber text-white font-mono text-[10px] flex items-center justify-center ring-2 ring-white font-bold animate-pulse">
              {unreadAlerts}
            </span>
          )}
        </motion.button>

        {/* Tablet Hardware Diagnostics */}
        <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-lumiere-border text-lumiere-textCaption">
          <Wifi className="w-3.5 h-3.5 text-lumiere-emerald" />
          <BatteryCharging className="w-4 h-4 text-lumiere-emerald" />
        </div>
      </div>
    </header>
  );
};