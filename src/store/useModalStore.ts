import { create } from 'zustand';

export type ActiveModalType = 'FOLIO' | 'RUN_SHEET' | 'SERVICE_RESOLVE' | null;

export interface ModalState {
  activeModal: ActiveModalType;
  selectedTableId: string | null;
  openFolio: (tableId: string) => void;
  openRunSheet: (tableId: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  selectedTableId: null,
  openFolio: (tableId: string) =>
    set({ activeModal: 'FOLIO', selectedTableId: tableId }),
  openRunSheet: (tableId: string) =>
    set({ activeModal: 'RUN_SHEET', selectedTableId: tableId }),
  closeModal: () =>
    set({ activeModal: null, selectedTableId: null }),
}));