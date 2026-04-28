"use client";

import Link from "next/link";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import TicketCard from "../TicketCard";
import {
  priorityBadgeClass,
  statusBadgeClass,
  STATUS_LABEL,
} from "../../lib/ticketHelpers";
import type { TicketWithRelations } from "../../../types";

interface DashboardData {
  openCount: number;
  inProgressCount: number;
  unassignedCount: number;
  myTickets: TicketWithRelations[];
  recentTickets: TicketWithRelations[];
}

export default function DashboardLayout({ data }: { data: DashboardData }) {
  const { role } = useApp();
  const {
    openCount,
    inProgressCount,
    unassignedCount,
    myTickets,
    recentTickets,
  } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header row */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-widest mb-1">
            {role === "supporter" ? "Supporter view" : "User view"}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        {role === "supporter" && (
          <Link
            href="/tickets/new"
            className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-80 transition-opacity"
          >
            + New ticket
          </Link>
        )}
        {role === "user" && (
          <Link
            href="/tickets/new"
            className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--ink-muted)] text-sm hover:bg-[var(--surface-2)] transition-colors"
          >
            Raise a ticket
          </Link>
        )}
      </div>

      {/* KPIs — supporter sees all three, user sees a simpler prompt */}
      {role === "supporter" ? (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <KPI label="Open" value={openCount} />
          <KPI label="In progress" value={inProgressCount} />
          <KPI label="Unassigned" value={unassignedCount} accent />
        </div>
      ) : (
        <Card className="p-5 mb-8 flex items-center justify-between">
          <p className="text-sm text-[var(--ink-muted)]">
            Need help? Raise a support ticket and track its progress here.
          </p>
          <Link
            href="/tickets/new"
            className="ml-4 shrink-0 px-4 py-2 rounded-xl bg-[var(--ink)] text-[var(--surface)] text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Raise a ticket
          </Link>
        </Card>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: ticket lists */}
        <div className="lg:col-span-2 space-y-6">
          {role === "supporter" && myTickets.length > 0 && (
            <section>
              <SectionLabel>Assigned to me</SectionLabel>
              <div className="space-y-2">
                {myTickets.map((t) => (
                  <TicketCard key={t.id} {...t} />
                ))}
              </div>
            </section>
          )}

          <section>
            <SectionLabel>
              {role === "supporter" ? "Recent tickets" : "All tickets"}
            </SectionLabel>
            {recentTickets.length === 0 ? (
              <Card className="p-6 text-center text-sm text-[var(--ink-faint)]">
                No tickets yet.
              </Card>
            ) : (
              <div className="space-y-2">
                {recentTickets.map((t) => (
                  <TicketCard key={t.id} {...t} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right: quick actions + SLA reminder */}
        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-mono text-[var(--ink-faint)] uppercase tracking-widest mb-3">
              Quick actions
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/tickets/new"
                className="text-sm px-4 py-2 rounded-xl bg-[var(--ink)] text-[var(--surface)] text-center hover:opacity-80 transition-opacity"
              >
                {role === "supporter" ? "Create ticket" : "Raise a ticket"}
              </Link>
              <Link
                href="/tickets"
                className="text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-center text-[var(--ink-muted)] hover:bg-[var(--surface-3)] transition-colors"
              >
                All tickets
              </Link>
              {role === "supporter" && (
                <Link
                  href="/tickets?filter=unassigned"
                  className="text-sm px-4 py-2 rounded-xl border border-[var(--border)] text-center text-[var(--ink-muted)] hover:bg-[var(--surface-3)] transition-colors"
                >
                  Unassigned
                </Link>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-mono text-[var(--ink-faint)] uppercase tracking-widest mb-3">
              SLA reminder
            </p>
            <div className="space-y-2 text-xs font-mono">
              {(["P1", "P2", "P3", "P4"] as const).map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <Badge
                    className={`${priorityBadgeClass(p)} w-8 justify-center`}
                  >
                    {p}
                  </Badge>
                  <span className="text-[var(--ink-muted)]">
                    {p === "P1"
                      ? "15 min / 4 h"
                      : p === "P2"
                        ? "1 h / 8 h"
                        : p === "P3"
                          ? "4 h / 48 h"
                          : "24 h / 120 h"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Local sub-components ───────────────────────────────────────────────────────

function KPI({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <Card className="p-5">
      <p className="text-xs text-[var(--ink-faint)] mb-2">{label}</p>
      <p
        className={`text-3xl font-semibold tracking-tight ${
          accent ? "text-[var(--accent)]" : "text-[var(--ink)]"
        }`}
      >
        {value}
      </p>
    </Card>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-[var(--ink-faint)] uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}
