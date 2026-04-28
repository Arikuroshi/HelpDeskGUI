import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Header from "./components/layout/Header";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kantan Help",
  description: "ITIL-style helpdesk system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface text-ink antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-ink/10 py-4 text-center text-xs text-ink/40 font-mono">
            © {new Date().getFullYear()} Kantan Help
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
