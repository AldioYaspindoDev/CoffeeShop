import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import MobileAppShell from "@/components/ui/mobileAppShell";

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
  title: "COFFEE",
  description: "Your Digital Workspace & Artisanal Coffee Experience App",
  manifest: "/manifest.json",
  icons: {
    icon: "/kopkit/icon.webp",
    shortcut: "/kopkit/icon.webp",
    apple: "/kopkit/icon.webp",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "COFFEE",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${projectNote.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-[#F7F7F7] text-[#1E1E1E]">
        <MobileAppShell>{children}</MobileAppShell>
      </body>
    </html>
  );
}
