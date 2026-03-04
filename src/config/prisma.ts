import { PrismaClient } from "../generated/prisma/client";
import { env } from "./env";

export const prisma = new PrismaClient({
	accelerateUrl: env.databaseUrl,
});
