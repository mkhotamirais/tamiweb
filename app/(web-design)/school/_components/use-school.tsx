"use client";

import { create } from "zustand";

type School1State = {
  nav: boolean;
  toggleNav: () => void;
  hideNav: () => void;
};

export const useSchool = create<School1State>((set) => ({
  nav: false,
  toggleNav: () => set((state) => ({ nav: !state.nav })),
  hideNav: () => set({ nav: false }),
}));
