import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalforPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalforPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalforPrisma.prisma = prisma;

export { prisma };
