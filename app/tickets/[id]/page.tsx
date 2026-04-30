import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import {
  priorityBadgeClass,
  statusBadgeClass,
  STATUS_LABEL,
  PRIORITY_LABEL,
  PRIORITY_SLA,
} from "../../lib/ticketHelpers";
import TicketActions from "../../components/TicketActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TicketPage({ params }: Props) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: true,
      assignedTo: true,
      comments: { include: { user: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!ticket) notFound();

  const sla = PRIORITY_SLA[ticket.priority];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/tickets"
        className="text-xs font-mono text-ink-faint hover:text-ink transition-colors mb-6 inline-block"
      >
        ← All tickets
      </Link>

      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight leading-snug mb-2">
            {ticket.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusBadgeClass(ticket.status)}>
              {STATUS_LABEL[ticket.status]}
            </Badge>
            <Badge className={priorityBadgeClass(ticket.priority)}>
              {PRIORITY_LABEL[ticket.priority]}
            </Badge>
            <span className="text-xs text-ink-faint font-mono">
              #{ticket.id.slice(-6)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-5">
            <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
              Description
            </p>
            <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">
              {ticket.description}
            </p>
          </Card>

          <div>
            <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
              Comments ({ticket.comments.length})
            </p>
            {ticket.comments.length === 0 ? (
              <p className="text-sm text-ink-faint">No comments yet.</p>
            ) : (
              <div className="space-y-3">
                {ticket.comments.map((c) => (
                  <Card key={c.id} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium">
                        {c.user.name ?? c.user.email}
                      </span>
                      <span className="text-xs font-mono text-ink-faint">
                        {new Date(c.createdAt).toLocaleString("en-GB")}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted">{c.content}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-5 text-xs space-y-3">
            <Row
              label="Raised by"
              value={ticket.user.name ?? ticket.user.email}
            />
            <Row label="Assigned to" value={ticket.assignedTo?.name ?? "—"} />
            <Row label="Impact" value={ticket.impact} />
            <Row label="Urgency" value={ticket.urgency} />
            <Row
              label="Created"
              value={new Date(ticket.createdAt).toLocaleDateString("en-GB")}
            />
            {ticket.dueDate && (
              <Row
                label="Due"
                value={new Date(ticket.dueDate).toLocaleDateString("en-GB")}
              />
            )}
          </Card>

          <Card className="p-5">
            <p className="text-xs font-mono text-ink-faint uppercase tracking-widest mb-3">
              SLA
            </p>
            <div className="text-xs font-mono space-y-1 text-ink-muted">
              <div>
                Response <span className="text-ink">{sla.response}</span>
              </div>
              <div>
                Resolve <span className="text-ink">{sla.resolution}</span>
              </div>
            </div>
          </Card>

          <TicketActions ticketId={ticket.id} currentStatus={ticket.status} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-ink-faint">{label}</span>
      <span className="text-ink font-medium text-right">{value}</span>
    </div>
  );
}
