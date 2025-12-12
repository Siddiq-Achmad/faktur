import type { Metadata } from "next";
import "../globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";
import { sharedMetadata } from "@/lib/metadata";
import { ToasterWrapper } from "@/components/toaster-wrapper";

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
    <html lang="en" suppressHydrationWarning className="h-full overflow-hidden">
      <body
        className={`font-sans antialiased h-full overflow-hidden ${fontFamily.className} ${fontFamily.style}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TRPCProvider>{children}</TRPCProvider>
        </ThemeProvider>
        <ToasterWrapper />
      </body>
    </html>
  );
}
