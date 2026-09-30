import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  RefreshCw,
  CheckCircle,
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
import { useModalStore } from './store/useModalStore';
import type { TableZone } from './types/table';
import { tapSpring } from './styles/motion';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'floor' | 'dispatch' | 'cellar'>('floor');
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  // Floor store
  const {
    activeZone,
    selectedTableId,
    tables,
    searchQuery,
    setActiveZone,
    setSelectedTableId,
    setSearchQuery,
    acknowledgeRequest,
  } = useFloorStore();

  // Alerts store
  const { alerts, dismissAlert } = useAlertStore();

  // Modal store (Phase 03 integration)
  const {
    activeModal,
    selectedTableId: modalTableId,
    openFolio,
    openRunSheet,
    closeModal,
  } = useModalStore();

  // Target Table for Active Modal (Folio or Run Sheet)
  const effectiveTableId = modalTableId || selectedTableId || 'table-02';
  const activeTable = useMemo(
    () => tables.find((t) => t.id === effectiveTableId) || tables[0] || null,
    [tables, effectiveTableId]
  );

  // Filtered tables based on room zone & search query
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const matchesZone = activeZone === 'ALL' || table.zone === activeZone;
      const matchesSearch =
        searchQuery === '' ||
        table.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (table.guest?.name && table.guest.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (table.activeCourse && table.activeCourse.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (table.serviceRequest?.label && table.serviceRequest.label.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (table.serverName && table.serverName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [tables, activeZone, searchQuery]);

  // Zone counts for top command ribbon
  const zoneCounts: Record<TableZone, number> = useMemo(() => {
    const counts: Record<TableZone, number> = {
      ALL: tables.length,
      MAIN_DINING: 0,
      VERANDA: 0,
      PRIVATE_SALON: 0,
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
        onOpenRunSheet={() => openRunSheet(effectiveTableId)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
      />

      {/* 2. Main Tablet Viewport */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeView === 'floor' && (
          <div className="max-w-[1680px] mx-auto space-y-6">
            {/* Top Command Ribbon: Zone Filter Strip & Quick Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <ZoneFilter
                activeZone={activeZone}
                onSelectZone={setActiveZone}
                counts={zoneCounts}
              />

              {/* Quick Search & Reset */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-lumiere-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search table, guest, or course..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-lumiere-border text-xs text-lumiere-textPrimary placeholder:text-lumiere-textCaption focus:outline-none focus:border-lumiere-brass shadow-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-lumiere-textCaption hover:text-lumiere-textPrimary cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <motion.button
                  whileTap={tapSpring.whileTap}
                  transition={tapSpring.transition}
                  onClick={() => setSearchQuery('')}
                  className="h-11 px-4 rounded-xl border border-lumiere-border bg-white text-xs font-medium text-lumiere-textMuted hover:text-lumiere-textPrimary flex items-center gap-2 shadow-sm cursor-pointer"
                  title="Reset filter"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </motion.button>
              </div>
            </div>

            {/* 3-Zone Tactile Table Card Floor Grid */}
            <FloorGrid
              tables={filteredTables}
              selectedTableId={effectiveTableId}
              onSelectTable={(table) => {
                setSelectedTableId(table.id);
                openFolio(table.id);
              }}
              onAcknowledgeTable={(tableId) => acknowledgeRequest(tableId)}
            />

            {/* Architecture Status Ribbon */}
            <div className="p-4 rounded-2xl bg-white border border-lumiere-border shadow-luxury flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lumiere-emeraldLight flex items-center justify-center text-lumiere-emerald shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-lumiere-textPrimary">
                    Phase 03: Guest Folio Ledger & Table Run-Sheet Modals Active
                  </h4>
                  <p className="text-xs text-lumiere-textMuted">
                    Framer Motion spring physics, 44px hit targets, degustation stepper, and lightweight useModalStore.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral" dot size="sm">
                  Empty: {tables.filter((t) => t.status === 'AVAILABLE').length}
                </Badge>
                <Badge variant="emerald" dot size="sm">
                  Dining: {tables.filter((t) => t.status === 'DINING').length}
                </Badge>
                <Badge variant="brass" dot size="sm">
                  Pacing: {tables.filter((t) => t.status === 'WAITING').length}
                </Badge>
                <Badge variant="amber" dot size="sm">
                  Service: {tables.filter((t) => t.status === 'REQUEST').length}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {activeView === 'dispatch' && (
          <div className="max-w-[1680px] mx-auto">
            <DispatchBoard />
          </div>
        )}

        {activeView === 'cellar' && (
          <div className="max-w-[1680px] mx-auto">
            <StockLedger />
          </div>
        )}
      </main>

      {/* =========================================
          3. INTERACTIVE MODALS (PHASE 03)
          ========================================= */}
      {/* Modal 1: Guest Folio & Degustation Ledger */}
      <GuestFolioModal
        isOpen={activeModal === 'FOLIO'}
        onClose={closeModal}
        table={activeTable}
      />

      {/* Modal 2: Table Run-Sheet & Schedule */}
      <RunSheetModal
        isOpen={activeModal === 'RUN_SHEET'}
        onClose={closeModal}
        table={activeTable}
        onOpenFolio={(tableId) => openFolio(tableId)}
      />

      {/* Service Alerts Flyout Modal */}
      <ModalShell
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        title="Live Service Inquiries"
        subtitle="Waiter Tablet Dispatch Alerts"
        maxWidth="max-w-xl"
      >
        <div className="p-6 space-y-3">
          {/* Table Service Requests */}
          {tables
            .filter((t) => t.status === 'REQUEST')
            .map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-lumiere-amberLight/50 border border-lumiere-amberBorder flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" dot size="sm">
                      TABLE {t.tableNumber}
                    </Badge>
                    <span className="font-semibold text-sm text-lumiere-textPrimary">
                      {t.serviceRequest?.label}
                    </span>
                  </div>
                  <p className="text-xs text-lumiere-textMuted font-mono">
                    Pending for {t.serviceRequest?.pendingSinceMinutes}m • {t.zone.replace('_', ' ')}
                  </p>
                </div>

                <button
                  onClick={() => acknowledgeRequest(t.id)}
                  className="bg-lumiere-amber hover:bg-amber-700 text-white font-mono text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  Acknowledge
                </button>
              </div>
            ))}

          {/* Sommelier & System Alerts */}
          {alerts.map((alert) => (
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
                className="px-2.5 py-1 text-xs rounded-lg border border-lumiere-border bg-white text-lumiere-textMuted hover:text-lumiere-textPrimary transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          ))}

          {tables.filter((t) => t.status === 'REQUEST').length === 0 && alerts.length === 0 && (
            <p className="text-xs text-lumiere-textCaption text-center py-8 italic">
              All dining stations operating smoothly. No active alerts.
            </p>
          )}
        </div>
      </ModalShell>
    </div>
  );
};

export default App;