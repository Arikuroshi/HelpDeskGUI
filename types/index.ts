// Single source of truth: re-export Prisma types so the rest of the app
// never has to import directly from @prisma/client.
export type {
  User,
  Ticket,
  Comment,
  Organization,
  Role,
  Status,
  Priority,
  Impact,
  Urgency,
} from "../app/generated/prisma";

// ── UI-only types ──────────────────────────────────────────────────────────────

export type AppRole = "user" | "supporter";

export type TicketWithRelations = {
  id: string;
  title: string;
  description: string;
  status: import("../app/generated/prisma").Status;
  priority: import("../app/generated/prisma").Priority;
  impact: import("../app/generated/prisma").Impact;
  urgency: import("../app/generated/prisma").Urgency;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  resolvedAt: Date | null;
  userId: string;
  user: { id: string; name: string | null; email: string };
  assignedToId: string | null;
  assignedTo: { id: string; name: string | null; email: string } | null;
  organizationId: string;
  comments: CommentWithAuthor[];
};

export type CommentWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: { id: string; name: string | null; email: string };
};

export {
  Role,
  Status,
  Priority,
  Impact,
  Urgency,
} from "../app/generated/prisma";
