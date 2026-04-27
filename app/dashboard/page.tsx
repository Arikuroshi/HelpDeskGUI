import DashboardLayout from "@/components/layout/DashboardLayout";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [
    openTickets,
    overdueTickets,
    unassignedTickets,
    myTickets,
    recentActivity,
  ] = await Promise.all([
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.findMany({
      where: { resolvedAt: { not: null, lt: new Date() } },
    }),
    prisma.ticket.count({ where: { assignedToId: null } }),
    prisma.ticket.findMany({
      where: { assignedToId: session.currentUser.id },
      take: 5,
    }),
    prisma.activity.findMany({ take: 10, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <DashboardLayout
      data={{
        openTickets,
        overdueTickets,
        unassignedTickets,
        myTickets,
        recentActivity,
      }}
    />
  );
}
