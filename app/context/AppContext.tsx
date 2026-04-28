"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { AppRole } from "../../types";

// ── Types ──────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface AppContextValue {
  role: AppRole;
  setRole: (r: AppRole) => void;
  theme: Theme;
  toggleTheme: () => void;
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<AppRole>("user");
  const [theme, setTheme] = useState<Theme>("light");

  // Persist + apply theme class on <html>
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  // Persist role
  useEffect(() => {
    const stored = localStorage.getItem("role") as AppRole | null;
    if (stored === "user" || stored === "supporter") setRoleState(stored);
  }, []);

  const setRole = (r: AppRole) => {
    localStorage.setItem("role", r);
    setRoleState(r);
  };

  return (
    <AppContext.Provider value={{ role, setRole, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
