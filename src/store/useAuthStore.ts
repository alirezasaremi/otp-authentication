import { OtpState } from "@/constants/enums";
import { create } from "zustand";

export type State = {
  step: string;
  sender: string; // mobile number or email
  methodId: string;
};

export type Action = {
  setStep: (step: string) => void;
  setSender: (sender: string) => void;
  setMethodId: (methodId: string) => void;
  reset: () => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  step: OtpState.SEND,
  sender: "",
  methodId: "",
  setStep: (step: string) => set({ step }),
  setSender: (sender: string) => set({ sender }),
  setMethodId: (methodId: string) => set({ methodId }),
  reset: () => set({ step: OtpState.SEND, sender: "", methodId: "" }),
}));
