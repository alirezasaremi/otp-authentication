import { Loader2 } from "lucide-react";
import React from "react";

interface WaitingButtonProps {
  isLoading: boolean;
  label: string;
}

const WaitingButton = ({ isLoading, label }: WaitingButtonProps) => {
  return (
    <>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && label}
    </>
  );
};

export default WaitingButton;
