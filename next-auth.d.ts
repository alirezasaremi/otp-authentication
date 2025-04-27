import NextAuth from "next-auth";

// Extend `User` type to include `phone_number`
declare module "next-auth" {
  interface User {
    id: string;
    phone_number: string;
  }

  interface Session {
    user: {
      id: string;
      phone_number: string;
    };
  }

  interface JWT {
    id: string;
    phone_number: string;
  }
}
