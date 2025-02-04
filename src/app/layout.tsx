import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../providers/query-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Generator",
  description: "generate team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-400`}
      >
        <main className="container mx-auto px-4 py-8 space-y-5">
          <h1 className="text-3xl font-bold mb-8">Random Team Generator</h1>
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
