"use client";

import { useApp } from "../context/AppContext";
import Card from "./ui/Card";
import type { Status } from "../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

const DEV_USER_ID = process.env.NEXT_PUBLIC_DEV_USER_ID ?? "";

interface Props {
  ticketId: string;
  currentStatus: Status;
  assignedToId: string | null;
  assignedToName: string | null;
}

export default function TicketActions({
  ticketId,
  currentStatus,
  assignedToId,
  assignedToName,
}: Props) {
  const { role } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (role !== "supporter") return null;

  async function updateStatus(status: Status) {
    setLoading(true);
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      toast("Status updated", "success");
      router.refresh();
    } else {
      toast("Failed to update status", "error");
    }
    setLoading(false);
  }

  async function claimTicket() {
    setLoading(true);
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedToId: DEV_USER_ID }),
    });
    if (res.ok) {
      toast("Ticket claimed", "success");
      router.refresh();
    } else {
      toast("Failed to claim ticket", "error");
    }
    setLoading(false);
  }

  async function unclaimTicket() {
    setLoading(true);
    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedToId: null }),
    });
    if (res.ok) {
      toast("Ticket unclaimed", "success");
      router.refresh();
    } else {
      toast("Failed to unclaim ticket", "error");
    }
    setLoading(false);
  }

  const transitions: { label: string; status: Status }[] = [
    { label: "Mark open", status: "OPEN" },
    { label: "Start progress", status: "IN_PROGRESS" },
    { label: "Close ticket", status: "CLOSED" },
  ].filter((t) => t.status !== currentStatus);

  const isClaimed = assignedToId !== null;
  const isClaimedByMe = assignedToId === DEV_USER_ID;

  return (
    <div className="space-y-3">
      {/* Claim / unclaim */}
      <Card className="p-5">
        <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
          Assignment
        </p>
        {isClaimed ? (
          <div className="space-y-2">
            <p className="text-xs text-ink-muted">
              Claimed by{" "}
              <span className="font-medium text-ink">
                {isClaimedByMe ? "you" : (assignedToName ?? "someone")}
              </span>
            </p>
            {isClaimedByMe && (
              <button
                disabled={loading}
                onClick={unclaimTicket}
                className="w-full text-sm px-4 py-2 rounded-xl border border-border text-ink-muted hover:bg-surface-3 hover:text-ink transition-colors disabled:opacity-50"
              >
                Unclaim
              </button>
            )}
          </div>
        ) : (
          <button
            disabled={loading}
            onClick={claimTicket}
            className="w-full text-sm px-4 py-2 rounded-xl bg-accent text-white hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            Claim ticket
          </button>
        )}
      </Card>

      {/* Status */}
      <Card className="p-5">
        <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
          Update status
        </p>
        <div className="flex flex-col gap-2">
          {transitions.map((t) => (
            <button
              key={t.status}
              disabled={loading}
              onClick={() => updateStatus(t.status)}
              className="w-full text-sm px-4 py-2 rounded-xl border border-border text-ink-muted hover:bg-surface-3 hover:text-ink transition-colors disabled:opacity-50"
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
