"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { AppRole } from "../../types";

type Theme = "light" | "dark";

interface AppContextValue {
  role: AppRole;
  setRole: (r: AppRole) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as Theme) ?? "light";
}

function getInitialRole(): AppRole {
  if (typeof window === "undefined") return "user";
  const stored = localStorage.getItem("role");
  return stored === "supporter" ? "supporter" : "user";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<AppRole>(getInitialRole);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply dark class on first render and whenever theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

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

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
