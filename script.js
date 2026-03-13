import { prisma } from "./lib/prisma.js";
import { PrismaClient } from "./generated/prisma/client.js";
import { getUsersWithPosts } from "./generated/prisma/sql/index.js";

async function main() {

  // Create a user with a post
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice3@prisma.io",
      posts: {
        create: {
          title: "Hello World",
          content: "This is my first post!",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log("Created user:", user);

  // Fetch all users
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.log("All users:", JSON.stringify(allUsers, null, 2));

  // Run TypedSQL query
  const usersWithPostCounts = await prisma.$queryRawTyped(
    getUsersWithPosts()
  );

  console.log("Users with post counts:", usersWithPostCounts);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });