import { PrismaClient, Priority, Status, Role } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 1. Upsert Organization
  const org = await prisma.organization.upsert({
    where: { id: "dev-org" },
    update: {},
    create: { id: "dev-org", name: "Kantan Tech Support" },
  });

  // 2. Upsert Supporter (The Agent)
  const supporter = await prisma.user.upsert({
    where: { email: "dev@kantan.help" },
    update: {},
    create: {
      email: "dev@kantan.help",
      name: "Kenji Sato",
      role: Role.SUPPORTER,
      organizationId: org.id,
    },
  });

  // 3. Upsert a regular User (The Requester)
  const requester = await prisma.user.upsert({
    where: { email: "user@kantan.help" },
    update: {},
    create: {
      email: "user@kantan.help",
      name: "Alice Tanaka",
      role: Role.USER,
      organizationId: org.id,
    },
  });

  // 4. Create dummy tickets to test your UI Components
  const ticketData = [
    {
      title: "Global VPN Authentication Failure",
      description:
        "Users in the Osaka branch cannot connect to the internal network. Requires immediate investigation.",
      priority: Priority.P1,
      status: Status.OPEN,
    },
    {
      title: "Slack Integration Maintenance",
      description:
        "Updating the webhook for the #general channel notifications.",
      priority: Priority.P3,
      status: Status.IN_PROGRESS,
      assignedToId: supporter.id,
    },
    {
      title: "New Laptop Request - Design Team",
      description:
        "Requesting a MacBook Pro M3 for the new senior designer joining next month.",
      priority: Priority.P4,
      status: Status.CLOSED,
      assignedToId: supporter.id,
    },
    {
      title: "Database latency in Production",
      description:
        "Queries are taking > 2000ms. Potential index issue on the Orders table.",
      priority: Priority.P2,
      status: Status.OPEN,
    },
  ];

  for (const t of ticketData) {
    await prisma.ticket.create({
      data: {
        ...t,
        userId: requester.id,
        organizationId: org.id,
      },
    });
  }

  console.log("\n✅ Kantan Seed complete!");
  console.log(`DEV_USER_ID=${supporter.id}`);
  console.log(`DEV_ORG_ID=${org.id}\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
