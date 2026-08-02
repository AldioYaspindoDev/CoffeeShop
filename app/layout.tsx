import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const projectNote = localFont({
  src: "../public/fonts/Project Note.otf",
  variable: "--font-project-note",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOPKIT",
  description: "KOPKIT - Your Digital Workspace Haven",
  manifest: "/manifest.json",
  icons: {
    icon: "/kopkit/icon.webp",
    apple: "/kopkit/icon.webp",
  },
};

export const viewport = {
  themeColor: "#1E1E1E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${projectNote.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
