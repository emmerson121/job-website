// import "server-only"
import { PrismaClient } from "@/app/generated/prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = 
    globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };