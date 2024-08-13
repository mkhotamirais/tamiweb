"use client";

import { create } from "zustand";
import { menu } from "./header";

type SectionName = (typeof menu)[number]["label"];
type PortoSayaState = {
  nav: boolean;
  activeSection: SectionName;
  timeLastClick: number;
  toggleNav: () => void;
  hideNav: () => void;
  setActiveSection: (activeSection: SectionName) => void;
  setTimeLastClick: (timeLastClick: number) => void;
};

export const usePortfolio = create<PortoSayaState>((set) => ({
  nav: false,
  activeSection: "home",
  timeLastClick: 0,
  toggleNav: () => set((state) => ({ nav: !state.nav })),
  hideNav: () => set({ nav: false }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setTimeLastClick: (timeLastClick) => set({ timeLastClick }),
}));
