import { ReactNode } from "react";

export interface OTPMethod {
  id: number;
  title: string | null;
  description: string | null;
  content: string | null;
  footer: ReactNode;
  method: string;
}
