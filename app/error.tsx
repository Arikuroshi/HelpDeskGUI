"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">
        Error
      </p>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Something went wrong
      </h1>
      <p className="text-ink-muted mb-8">
        {error.message ?? "An unexpected error occurred."}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-ink text-surface text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-border text-ink-muted text-sm hover:bg-surface-2 transition-colors"
        >
          Go home
        </Link>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs font-mono text-ink-faint">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
