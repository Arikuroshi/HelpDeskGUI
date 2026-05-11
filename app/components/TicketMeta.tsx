"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import Card from "./ui/Card";
import type { Impact, Urgency } from "../../types";
import { useToast } from "../context/ToastContext";

interface Props {
  ticketId: string;
  currentImpact: Impact;
  currentUrgency: Urgency;
}

export default function TicketMeta({
  ticketId,
  currentImpact,
  currentUrgency,
}: Props) {
  const { role } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  const [impact, setImpact] = useState<Impact>(currentImpact);
  const [urgency, setUrgency] = useState<Urgency>(currentUrgency);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  if (role !== "supporter") return null;

  async function handleSave() {
    setLoading(true);
    setSaved(false);
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ impact, urgency }),
    });
    if (res.ok) {
      toast("Impact & urgency updated", "success");
      setSaved(true);
      router.refresh();
    } else {
      toast("Failed to save changes", "error");
    }
    setLoading(false);
  }

  const options = ["LOW", "MEDIUM", "HIGH"] as const;

  return (
    <Card className="p-5">
      <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
        Edit impact & urgency
      </p>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-faint uppercase tracking-widest">
            Impact
          </label>
          <select
            value={impact}
            onChange={(e) => {
              setImpact(e.target.value as Impact);
              setSaved(false);
            }}
            className="input"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o.charAt(0) + o.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-ink-faint uppercase tracking-widest">
            Urgency
          </label>
          <select
            value={urgency}
            onChange={(e) => {
              setUrgency(e.target.value as Urgency);
              setSaved(false);
            }}
            className="input"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o.charAt(0) + o.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full text-sm px-4 py-2 rounded-xl bg-ink text-surface hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
        </button>
      </div>
    </Card>
  );
}
