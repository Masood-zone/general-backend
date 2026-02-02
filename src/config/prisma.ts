import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";

const sslRequired =
  process.env.NODE_ENV === "production" ||
  /sslmode=require/i.test(env.databaseUrl);

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: env.databaseUrl,
    ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
  }),
});
