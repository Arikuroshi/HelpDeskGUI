import { prisma } from "../lib/prisma";
import DashboardLayout from "../components/layout/DashboardLayout";

// TODO: replace DEV_USER_ID with real auth (e.g. NextAuth session)
const DEV_USER_ID = process.env.DEV_USER_ID ?? "";

export default async function DashboardPage() {
  const [
    openCount,
    inProgressCount,
    unassignedCount,
    myTickets,
    recentTickets,
  ] = await Promise.all([
    prisma.ticket.count({ where: { status: "OPEN" } }),

    prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),

    prisma.ticket.count({
      where: { assignedToId: null, status: { not: "CLOSED" } },
    }),

    DEV_USER_ID
      ? prisma.ticket.findMany({
          where: { assignedToId: DEV_USER_ID, status: { not: "CLOSED" } },
          orderBy: { updatedAt: "desc" },
          take: 5,
          include: { user: true, assignedTo: true },
        })
      : [],

    prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { user: true, assignedTo: true },
    }),
  ]);

  return (
    <DashboardLayout
      data={{
        openCount,
        inProgressCount,
        unassignedCount,
        myTickets,
        recentTickets,
      }}
    />
  );
}
