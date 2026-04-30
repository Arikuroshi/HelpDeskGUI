import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-4 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-ink-muted">
        The page you are looking for does not exist.
      </p>
      <Link href="/help-center" className="text-blue-500 hover:underline">
        Return to Help Centre
      </Link>
    </main>
  );
}
