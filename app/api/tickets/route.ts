import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import type { Impact, Urgency, Priority } from "../../../app/generated/prisma";

// Priority is derived from impact + urgency (ITIL matrix)
function derivePriority(impact: Impact, urgency: Urgency): Priority {
  if (impact === "HIGH" && urgency === "HIGH") return "P1";
  if (impact === "HIGH" && urgency === "MEDIUM") return "P2";
  if (impact === "MEDIUM" && urgency === "HIGH") return "P2";
  if (impact === "HIGH" && urgency === "LOW") return "P3";
  if (impact === "LOW" && urgency === "HIGH") return "P3";
  if (impact === "MEDIUM" && urgency === "MEDIUM") return "P3";
  return "P4";
}

// TODO: replace with real auth — use a seeded user for now
const DEV_USER_ID = process.env.DEV_USER_ID ?? "";
const DEV_ORG_ID = process.env.DEV_ORG_ID ?? "";

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, assignedTo: true },
  });
  return NextResponse.json(tickets);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, impact = "LOW", urgency = "LOW" } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 },
    );
  }

  if (!DEV_USER_ID || !DEV_ORG_ID) {
    return NextResponse.json(
      { error: "DEV_USER_ID and DEV_ORG_ID env vars must be set" },
      { status: 500 },
    );
  }

  const priority = derivePriority(impact as Impact, urgency as Urgency);

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      impact: impact as Impact,
      urgency: urgency as Urgency,
      priority,
      userId: DEV_USER_ID,
      organizationId: DEV_ORG_ID,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
