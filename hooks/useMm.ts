import { create } from "zustand";

type MmState = {
  mm: boolean;
  openMm: () => void;
  closeMm: () => void;
  me: boolean;
  openMe: () => void;
  closeMe: () => void;
};

export const useMm = create<MmState>((set) => ({
  mm: false,
  openMm: () => set({ mm: true }),
  closeMm: () => set({ mm: false }),
  me: false,
  openMe: () => set({ me: true }),
  closeMe: () => set({ me: false }),
}));
