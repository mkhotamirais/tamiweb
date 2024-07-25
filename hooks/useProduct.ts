import { create } from "zustand";

type ProductStoreState = {
  successMsg: string | undefined;
  setSuccessMsg: (successMsg: string) => void;
  errorMsg: string | undefined;
  setErrorMsg: (errorMsg: string) => void;
};

export const useProducStore = create<ProductStoreState>((set) => ({
  successMsg: "",
  setSuccessMsg: (successMsg) => set({ successMsg }),
  errorMsg: "",
  setErrorMsg: (errorMsg) => set({ errorMsg }),
}));
