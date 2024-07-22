import { create } from "zustand";

type MmStoreState = {
  mm: boolean;
  showMm: () => void;
  hideMm: () => void;
};

export const useMmStore = create<MmStoreState>((set) => ({
  mm: false,
  showMm: () => set({ mm: true }),
  hideMm: () => set({ mm: false }),
}));
