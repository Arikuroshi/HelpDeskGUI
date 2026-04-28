import Link from "next/link";
import Badge from "./ui/badge";
import {
  priorityBadgeClass,
  statusBadgeClass,
  PRIORITY_LABEL,
  STATUS_LABEL,
} from "../lib/ticketHelpers";
import type { Priority, Status } from "../../types";

interface TicketCardProps {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  assignedTo?: { name: string | null } | null;
}

export default function TicketCard({
  id,
  title,
  status,
  priority,
  createdAt,
  assignedTo,
}: TicketCardProps) {
  return (
    <Link
      href={`/tickets/${id}`}
      className="block rounded-2xl border border-border bg-surface-2 p-4 hover:bg-surface-3 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-medium text-ink leading-snug group-hover:underline decoration-ink-faint">
          {title}
        </h3>
        <Badge className={priorityBadgeClass(priority)}>{priority}</Badge>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={statusBadgeClass(status)}>
          {STATUS_LABEL[status]}
        </Badge>
        {assignedTo && (
          <span className="text-xs text-ink-faint">
            → {assignedTo.name ?? "Unknown"}
          </span>
        )}
        <span className="ml-auto text-xs font-mono text-ink-faint">
          {new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
