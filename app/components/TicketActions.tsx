"use client";

import { useApp } from "../context/AppContext";
import Card from "./ui/Card";
import type { Status } from "../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  ticketId: string;
  currentStatus: Status;
}

export default function TicketActions({ ticketId, currentStatus }: Props) {
  const { role } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (role !== "supporter") return null;

  async function updateStatus(status: Status) {
    setLoading(true);
    await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  const transitions: { label: string; status: Status }[] = [
    { label: "Mark open", status: "OPEN" },
    { label: "Start progress", status: "IN_PROGRESS" },
    { label: "Close ticket", status: "CLOSED" },
  ].filter((t) => t.status !== currentStatus);

  return (
    <Card className="p-5">
      <p className="text-xs font-mono text-[var(--ink-faint)] uppercase tracking-widest mb-3">
        Update status
      </p>
      <div className="flex flex-col gap-2">
        {transitions.map((t) => (
          <button
            key={t.status}
            disabled={loading}
            onClick={() => updateStatus(t.status)}
            className="w-full text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--ink-muted)] hover:bg-[var(--surface-3)] hover:text-[var(--ink)] transition-colors disabled:opacity-50"
          >
            {t.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
