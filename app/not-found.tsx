import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-ink-muted mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-ink text-surface text-sm font-medium hover:opacity-80 transition-opacity"
      >
        Go home
      </Link>
    </div>
  );
}
