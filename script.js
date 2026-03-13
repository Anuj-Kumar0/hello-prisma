import { prisma } from "./lib/prisma.js";
import { PrismaClient } from "./generated/prisma/client.js";
import { getUsersWithPosts } from "./generated/prisma/sql/index.js";

async function main() {
  // --- CLEAR ALL DATA FIRST ---
  // Delete dependent tables first (Posts) then parents (Users)
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("All existing data cleared!");
}

  main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });