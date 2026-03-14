// ./prisma/migrations/<timestamp>/data-migration.js
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.$transaction(async (tx) => {
    const posts = await tx.post.findMany()

    for (const post of posts) {
      await tx.post.update({
        where: { id: post.id },
        data: {
          status: post.published ? "Published" : "Unknown",
        },
      })
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })