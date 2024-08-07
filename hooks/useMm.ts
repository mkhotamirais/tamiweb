import { create } from "zustand";

type Theme = "light" | "dark";
type MmState = {
  mm: boolean;
  openMm: () => void;
  closeMm: () => void;
  me: boolean;
  openMe: () => void;
  closeMe: () => void;
  theme: Theme;
  heroBtn: boolean;
  bottomMenu: boolean;
  toggleMm: () => void;
  hideMm: () => void;
  toggleHeroBtn: () => void;
  hideHeroBtn: () => void;
  showHeroBtn: () => void;
  toggleBottomMenu: () => void;
  setTheme: (theme: Theme) => void;
};

export const useMm = create<MmState>((set) => ({
  mm: false,
  openMm: () => set({ mm: true }),
  closeMm: () => set({ mm: false }),
  me: false,
  openMe: () => set({ me: true }),
  closeMe: () => set({ me: false }),
  theme: "light",
  heroBtn: true,
  bottomMenu: true,
  toggleMm: () => set((state) => ({ mm: !state.mm })),
  hideMm: () => set({ mm: false }),
  toggleHeroBtn: () => set((state) => ({ heroBtn: !state.heroBtn })),
  hideHeroBtn: () => set({ heroBtn: false }),
  showHeroBtn: () => set({ heroBtn: true }),
  toggleBottomMenu: () => set((state) => ({ bottomMenu: !state.bottomMenu })),
  setTheme: (theme: Theme) => set({ theme }),
}));
