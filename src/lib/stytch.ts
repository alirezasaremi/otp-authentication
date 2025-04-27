import { Client } from "stytch";

export const stytch = new Client({
  project_id: process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID!,
  secret: process.env.NEXT_PUBLIC_STYTCH_SECRET!,
});
