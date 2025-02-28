import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface PhoneNumberFormProps {
  action: (FormData: FormData) => void;
  errors: {
    phoneNumber?: string[];
    _form?: string[];
  };
}

const PhoneNumberForm = ({ action, errors }: PhoneNumberFormProps) => {
  return (
    <>
      <h6 className="font-bold text-stone-700 mb-6 text-center">
        Enter your phone number to continue
      </h6>
      <form
        action={action}
        className="w-full flex flex-col items-center justify-center gap-3"
      >
        <Input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          error={errors.phoneNumber?.join(", ")}
        />

        {errors._form && (
          <p className="text-rose-500 text-xs text-left mt-1 w-full">
            {errors._form.join(", ")}
          </p>
        )}

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </>
  );
};

export default PhoneNumberForm;
