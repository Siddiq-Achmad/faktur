import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import { sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = sharedMetadata;

const fontFamily = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased dark ${fontFamily.className} ${fontFamily.style}`}
      >
        {children}
      </body>
    </html>
  );
}
