import { PrismaClient } from "@prisma/client";
import bookData from "../data/books.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };
import orderData from "../data/orders.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { books } = bookData;
  const { users } = userData;
  const { orders } = orderData;
  console.log(orders);

  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {},
      create: book,
    });
  }
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const order of orders) {
    try {
      await prisma.order.upsert({
        where: { id: order.id },
        update: {},
        create: order,
      });
    } catch (error) {
      console.error(
        `Error upserting order with ID ${order.id}: ${error.message}`
      );
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
