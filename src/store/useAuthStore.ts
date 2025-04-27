import { OtpState } from "@/constants/enums";
import { create } from "zustand";

export type State = {
  step: string;
  mobile: string;
  methodId: string;
};

export type Action = {
  setStep: (step: string) => void;
  setMobile: (mobile: string) => void;
  setMethodId: (methodId: string) => void;
  reset: () => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  step: OtpState.SEND,
  mobile: "",
  methodId: "",
  setStep: (step: string) => set({ step }),
  setMobile: (mobile: string) => set({ mobile }),
  setMethodId: (methodId: string) => set({ methodId }),
  reset: () => set({ step: OtpState.SEND, mobile: "", methodId: "" }),
}));
