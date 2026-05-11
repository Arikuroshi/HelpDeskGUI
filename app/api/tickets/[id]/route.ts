import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import type { Status, Impact, Urgency, Priority } from "../../../../types";

const VALID_STATUSES: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

function derivePriority(impact: Impact, urgency: Urgency): Priority {
  if (impact === "HIGH" && urgency === "HIGH") return "P1";
  if (impact === "HIGH" && urgency === "MEDIUM") return "P2";
  if (impact === "MEDIUM" && urgency === "HIGH") return "P2";
  if (impact === "HIGH" && urgency === "LOW") return "P3";
  if (impact === "LOW" && urgency === "HIGH") return "P3";
  if (impact === "MEDIUM" && urgency === "MEDIUM") return "P3";
  return "P4";
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const { status, assignedToId, impact, urgency } = body as {
    status?: Status;
    assignedToId?: string | null;
    impact?: Impact;
    urgency?: Urgency;
  };

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // If impact or urgency changed, re-derive priority
  let priorityUpdate = {};
  if (impact || urgency) {
    const current = await prisma.ticket.findUnique({
      where: { id },
      select: { impact: true, urgency: true },
    });
    if (current) {
      const newImpact = impact ?? current.impact;
      const newUrgency = urgency ?? current.urgency;
      priorityUpdate = { priority: derivePriority(newImpact, newUrgency) };
    }
  }

  const ticket = await prisma.ticket.update({
    where: { id },
    data: {
      ...(status
        ? {
            status,
            ...(status === "CLOSED"
              ? { resolvedAt: new Date() }
              : { resolvedAt: null }),
          }
        : {}),
      ...("assignedToId" in body ? { assignedToId } : {}),
      ...(impact ? { impact } : {}),
      ...(urgency ? { urgency } : {}),
      ...priorityUpdate,
    },
  });

  return NextResponse.json(ticket);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: true,
      assignedTo: true,
      comments: { include: { user: true } },
    },
  });
  if (!ticket)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(ticket);
}
