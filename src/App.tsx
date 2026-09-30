import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Header } from './components/common/Header';
import { Badge } from './components/common/Badge';
import { ModalShell } from './components/common/ModalShell';
import { ZoneFilter } from './components/floor/ZoneFilter';
import { FloorGrid } from './components/floor/FloorGrid';
import { DispatchBoard } from './components/dispatch/DispatchBoard';
import { StockLedger } from './components/cellar/StockLedger';
import { GuestFolioModal } from './components/modals/GuestFolioModal';
import { RunSheetModal } from './components/modals/RunSheetModal';
import { useFloorStore } from './store/useFloorStore';
import { useAlertStore } from './store/useAlertStore';
import type { DiningZone } from './types/table';
import { tapSpring } from './styles/motion';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'floor' | 'dispatch' | 'cellar'>('floor');
  const [isRunSheetOpen, setIsRunSheetOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  const {
    activeZone,
    selectedTableId,
    tables,
    searchQuery,
    setActiveZone,
    setSelectedTableId,
    setSearchQuery,
    updateTableStatus,
  } = useFloorStore();

  const { alerts, dismissAlert } = useAlertStore();

  // Selected Table for Guest Folio Modal
  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selectedTableId) || null,
    [tables, selectedTableId]
  );

  // Filtered tables based on zone & search
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const matchesZone = activeZone === 'all' || table.zone === activeZone;
      const matchesSearch =
        searchQuery === '' ||
        table.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (table.guest?.name && table.guest.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        table.serverName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesZone && matchesSearch;
    });
  }, [tables, activeZone, searchQuery]);

  // Zone counts for filter pill badges
  const zoneCounts = useMemo(() => {
    const counts: Record<DiningZone, number> = {
      all: tables.length,
      'main-dining': 0,
      terrace: 0,
      'private-salon': 0,
      'cellar-vault': 0,
    };
    tables.forEach((t) => {
      if (counts[t.zone] !== undefined) {
        counts[t.zone]++;
      }
    });
    return counts;
  }, [tables]);

  return (
    <div className="flex flex-col h-screen w-screen bg-lumiere-canvas overflow-hidden select-none">
      {/* 1. Luxury Tablet Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenRunSheet={() => setIsRunSheetOpen(true)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
      />

      {/* 2. Main Tablet Viewport */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeView === 'floor' && (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Floor Navigation & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <ZoneFilter
                activeZone={activeZone}
                onSelectZone={setActiveZone}
                counts={zoneCounts}
              />

              {/* Quick Search & Filters */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-lumiere-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search table or guest..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-lumiere-border text-xs text-lumiere-textPrimary placeholder:text-lumiere-textCaption focus:outline-none focus:border-lumiere-brass shadow-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-lumiere-textCaption hover:text-lumiere-textPrimary"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <motion.button
                  whileTap={tapSpring.whileTap}
                  transition={tapSpring.transition}
                  onClick={() => setSearchQuery('')}
                  className="h-10 px-3.5 rounded-xl border border-lumiere-border bg-white text-xs font-medium text-lumiere-textMuted hover:text-lumiere-textPrimary flex items-center gap-1.5 shadow-sm"
                  title="Reset filter"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </motion.button>
              </div>
            </div>

            {/* Interactive Floor Grid */}
            <FloorGrid
              tables={filteredTables}
              selectedTableId={selectedTableId}
              onSelectTable={(table) => setSelectedTableId(table.id)}
            />

            {/* Verification Criteria Ribbon */}
            <div className="p-4 rounded-2xl bg-white border border-lumiere-border shadow-luxury flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lumiere-brassLight flex items-center justify-center text-lumiere-brass shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-lumiere-textPrimary">
                    LUMIÈRE Design Tokens & Motion Verification
                  </h4>
                  <p className="text-xs text-lumiere-textMuted">
                    Bone-porcelain palette, Cormorant Garamond, Plus Jakarta Sans & JetBrains Mono active.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="emerald" dot size="sm">
                  Emerald Token
                </Badge>
                <Badge variant="amber" dot size="sm">
                  Amber Token
                </Badge>
                <Badge variant="brass" dot size="sm">
                  Brass Token
                </Badge>
                <Badge variant="terracotta" dot size="sm">
                  Terracotta Token
                </Badge>
              </div>
            </div>
          </div>
        )}

        {activeView === 'dispatch' && (
          <div className="max-w-7xl mx-auto">
            <DispatchBoard />
          </div>
        )}

        {activeView === 'cellar' && (
          <div className="max-w-7xl mx-auto">
            <StockLedger />
          </div>
        )}
      </main>

      {/* 3. Interactive Modals (Testing modalMotion & Framer Motion Engine) */}
      <GuestFolioModal
        isOpen={Boolean(selectedTable)}
        onClose={() => setSelectedTableId(null)}
        table={selectedTable}
        onUpdateStatus={(status) => {
          if (selectedTableId) {
            updateTableStatus(selectedTableId, status);
          }
        }}
      />

      <RunSheetModal
        isOpen={isRunSheetOpen}
        onClose={() => setIsRunSheetOpen(false)}
      />

      {/* Service Alerts Flyout Modal */}
      <ModalShell
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        title="Active Service Alerts"
        subtitle="Live Table & Sommelier Notifications"
        maxWidth="max-w-xl"
      >
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-xs text-lumiere-textCaption text-center py-8 italic">
              All dining stations operating smoothly. No active alerts.
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-xl bg-lumiere-surface border border-lumiere-borderLight flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        alert.severity === 'terracotta'
                          ? 'terracotta'
                          : alert.severity === 'amber'
                          ? 'amber'
                          : 'brass'
                      }
                      dot
                      size="sm"
                    >
                      Table {alert.tableNumber}
                    </Badge>
                    <span className="font-medium text-sm text-lumiere-textPrimary">
                      {alert.title}
                    </span>
                  </div>
                  <p className="text-xs text-lumiere-textMuted">{alert.description}</p>
                  <span className="font-mono text-[10px] text-lumiere-textCaption">
                    Triggered at {alert.timestamp}
                  </span>
                </div>

                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-lumiere-border bg-white text-lumiere-textMuted hover:text-lumiere-textPrimary transition-colors"
                >
                  Dismiss
                </button>
              </div>
            ))
          )}
        </div>
      </ModalShell>
    </div>
  );
};

export default App;