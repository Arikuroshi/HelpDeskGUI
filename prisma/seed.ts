import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const org = await prisma.organization.upsert({
    where: { id: "dev-org" },
    update: {},
    create: { id: "dev-org", name: "Dev Organisation" },
  });

  const user = await prisma.user.upsert({
    where: { email: "dev@kantan.help" },
    update: {},
    create: {
      email: "dev@kantan.help",
      name: "Dev User",
      role: "SUPPORTER",
      organizationId: org.id,
    },
  });

  console.log("\n✅ Seed complete — add these to your .env:\n");
  console.log(`DEV_USER_ID=${user.id}`);
  console.log(`DEV_ORG_ID=${org.id}\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
