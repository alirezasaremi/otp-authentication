import { Site } from "@/constants/enums";
import { cookies } from "next/headers";

export const createCookie = (session_token: string) => {
  cookies().set(Site.TOKEN, session_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};
