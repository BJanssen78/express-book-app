import { PrismaClient } from "@prisma/client";

const getOrders = async (bookID, userID) => {
  const prisma = new PrismaClient();

  return prisma.book.findMany({
    where: {
      bookID,
      userID,
    },
  });
};

export default getOrders;
