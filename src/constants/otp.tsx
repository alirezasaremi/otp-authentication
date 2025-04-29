import { OTPMethod } from "@/types/otp";
import Link from "next/link";
import { OtpMethod } from "./enums";

export const OTPMethods: OTPMethod[] = [
  {
    id: 1,
    title: "Email",
    description: "Receive OTP via email",
    content: "OTP will send from Stytch email service ",
    footer: <p>No Configuration Needed</p>,
    method: OtpMethod.EMAIL,
  },
  {
    id: 2,
    title: "SMS",
    description: "Receive OTP via SMS",
    content: "OTP will send from Stytch SMS service ",
    footer: (
      <Link
        href="https://stytch.com/docs/guides/passcodes/unsupported-countries"
        target="_blank"
      >
        Unsupported Country List
      </Link>
    ),
    method: OtpMethod.SMS,
  },
  {
    id: 3,
    title: "Custom SMS Gateway",
    description: "Receive OTP via SMS",
    content: "OTP will send from your custom SMS service ",
    footer: (
      <p>Configuration may be vary depending on your SMS service provider</p>
    ),
    method: OtpMethod.CUSTOM_SMS,
  },
];
