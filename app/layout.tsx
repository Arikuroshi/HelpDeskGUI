import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
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
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') document.documentElement.classList.add('dark');
          } catch(e) {}
        `}</Script>
        <AppProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-4 text-center text-xs text-ink-faint font-mono">
              © {new Date().getFullYear()} Kantan Help
            </footer>
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
