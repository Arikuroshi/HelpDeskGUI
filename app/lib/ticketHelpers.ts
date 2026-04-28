import type { Priority, Status } from "../../types";

export const PRIORITY_LABEL: Record<Priority, string> = {
  P1: "P1 — Critical",
  P2: "P2 — High",
  P3: "P3 — Medium",
  P4: "P4 — Low",
};

export const PRIORITY_SLA: Record<
  Priority,
  { response: string; resolution: string }
> = {
  P1: { response: "15 min", resolution: "4 h" },
  P2: { response: "1 h", resolution: "8 h" },
  P3: { response: "4 h", resolution: "48 h" },
  P4: { response: "24 h", resolution: "120 h" },
};

export function priorityBadgeClass(p: Priority) {
  return { P1: "badge-p1", P2: "badge-p2", P3: "badge-p3", P4: "badge-p4" }[p];
}

export function statusBadgeClass(s: Status) {
  return {
    OPEN: "badge-open",
    IN_PROGRESS: "badge-in_progress",
    CLOSED: "badge-closed",
  }[s];
}

export const STATUS_LABEL: Record<Status, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  CLOSED: "Closed",
};
