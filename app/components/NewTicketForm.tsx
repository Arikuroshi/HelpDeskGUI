"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./ui/Card";

export default function NewTicketForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      description: fd.get("description"),
      impact: fd.get("impact"),
      urgency: fd.get("urgency"),
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    const ticket = await res.json();
    router.push(`/tickets/${ticket.id}`);
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" name="title" required>
          <input
            name="title"
            required
            placeholder="Brief summary of the issue"
            className="input"
          />
        </Field>

        <Field label="Description" name="description" required>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Steps to reproduce, what you expected, what happened…"
            className="input resize-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Impact" name="impact">
            <select name="impact" defaultValue="LOW" className="input">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </Field>

          <Field label="Urgency" name="urgency">
            <select name="urgency" defaultValue="LOW" className="input">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </Field>
        </div>

        {error && (
          <p className="text-sm text-[var(--p1)] bg-[var(--p1)]/10 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[var(--ink)] text-[var(--surface)] text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit ticket"}
        </button>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  required = false,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="text-xs font-mono text-[var(--ink-faint)] uppercase tracking-widest"
      >
        {label}
        {required && <span className="text-[var(--accent)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
