import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/font";


export const metadata: Metadata = {
  title: "Next.js + Stytch",
  description: "Next.js authentication using Stytch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
