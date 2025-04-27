import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db"; // Prisma client instance

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.otp) {
          throw new Error("Missing phone number or OTP");
        }

        // Find user in database
        const user = await db.user.findFirst({
          where: { phone_number: credentials.phoneNumber },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.otp_expires || !user.otp_code) {
          throw new Error("OTP not found");
        }

        // Validate OTP
        const isValidOTP =
          user.otp_code === credentials.otp &&
          new Date(user.otp_expires) > new Date();

        if (!isValidOTP) {
          throw new Error("Invalid or expired OTP");
        }

        return {
          id: user.id,
          name: user.name,
          phone_number: user.phone_number || "",
          otp_code: user.otp_code,
          otp_expires: user.otp_expires,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone_number = user.phone_number;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.phone_number = token.phone_number as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
