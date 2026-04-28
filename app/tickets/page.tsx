import { prisma } from "../lib/prisma";
import TicketCard from "../components/TicketCard";
import Link from "next/link";
import type { Status } from "../../types";

interface SearchParams {
  filter?: string;
  status?: string;
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const statusFilter =
    (searchParams.status?.toUpperCase() as Status) ?? undefined;
  const unassignedOnly = searchParams.filter === "unassigned";

  const tickets = await prisma.ticket.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(unassignedOnly ? { assignedToId: null } : {}),
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: true, assignedTo: true },
  });

  const statuses: { value: Status | ""; label: string }[] = [
    { value: "", label: "All" },
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In progress" },
    { value: "CLOSED", label: "Closed" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
        <Link
          href="/tickets/new"
          className="px-4 py-2 rounded-xl bg-[var(--ink)] text-[var(--surface)] text-sm font-medium hover:opacity-80 transition-opacity"
        >
          + New
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[var(--surface-2)] w-fit">
        {statuses.map(({ value, label }) => {
          const active = (searchParams.status ?? "") === value;
          return (
            <Link
              key={value}
              href={value ? `/tickets?status=${value}` : "/tickets"}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[var(--ink)] text-[var(--surface)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Ticket list */}
      {tickets.length === 0 ? (
        <div className="text-center py-16 text-[var(--ink-faint)] text-sm">
          No tickets found.
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
