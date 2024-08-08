import { create } from "zustand";

type TmdbState = {
  cari: string;
  setCari: (cari: string) => void;
};

export const useTmdb = create<TmdbState>((set) => ({
  cari: "",
  setCari: (cari) => set({ cari }),
}));
