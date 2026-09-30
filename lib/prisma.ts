// import { PrismaClient } from "@/app/generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb"

// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient;
// };

// const adapter = new PrismaMariaDb({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//  port: Number(process.env.DB_PORT) || 3306,
//   database: process.env.DB_NAME,
//   connectionLimit: 5,
// });

// const prisma = 
//     globalForPrisma.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export { prisma };

import fs from "fs";
import path from "path";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const caPath = path.join(process.cwd(), "certs", "ca.pem");
const ca = [fs.readFileSync(caPath)];

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  connectionLimit: 5,
connectTimeout: 10000,

  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});

const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };