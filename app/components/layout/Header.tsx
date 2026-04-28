"use client";

import Link from "next/link";
import { useApp } from "../../context/AppContext";

export default function Header() {
  const { role, setRole, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-[var(--ink)] tracking-tight flex items-center gap-2"
        >
          <span className="text-[var(--accent)] font-mono text-lg leading-none">
            ⬡
          </span>
          Kantan Help
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm text-[var(--ink-muted)]">
          <Link
            href="/dashboard"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/tickets"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Tickets
          </Link>
          {role === "supporter" && (
            <Link
              href="/tickets/new"
              className="hover:text-[var(--ink)] transition-colors"
            >
              New ticket
            </Link>
          )}
          <Link
            href="/help-center"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Help centre
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Role toggle */}
          <div className="flex items-center rounded-lg border border-[var(--border)] overflow-hidden text-xs font-mono">
            <button
              onClick={() => setRole("user")}
              className={`px-3 py-1.5 transition-colors ${
                role === "user"
                  ? "bg-[var(--ink)] text-[var(--surface)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setRole("supporter")}
              className={`px-3 py-1.5 transition-colors ${
                role === "supporter"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              Supporter
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors"
          >
            {theme === "light" ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11Z"
                  fill="currentColor"
                />
                <path
                  d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.05 3.05l1.06 1.06M10.89 10.89l1.06 1.06M3.05 11.95l1.06-1.06M10.89 4.11l1.06-1.06"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
