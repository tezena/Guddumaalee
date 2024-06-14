 // Adjust the path as needed
import { PrismaClient as PrismaClient2 } from "../../prisma/client2"; // Adjust the path as needed

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma2: PrismaClient2;
}

let prisma2: PrismaClient2;

if (process.env.NODE_ENV === "production") {
  prisma2 = new PrismaClient2();
} else {
  
  if (!global.cachedPrisma2) {
    global.cachedPrisma2 = new PrismaClient2();
  }
  prisma2 = global.cachedPrisma2;
}

export const db2 = prisma2;

