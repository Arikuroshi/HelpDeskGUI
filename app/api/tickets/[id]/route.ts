import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import type { Status } from "../../../../app/generated/prisma";

const VALID_STATUSES: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { status } = body as { status: Status };

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const ticket = await prisma.ticket.update({
    where: { id: params.id },
    data: {
      status,
      ...(status === "CLOSED"
        ? { resolvedAt: new Date() }
        : { resolvedAt: null }),
    },
  });

  return NextResponse.json(ticket);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
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
