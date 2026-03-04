"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../generated/prisma/client");
const env_1 = require("./env");
exports.prisma = new client_1.PrismaClient({
    accelerateUrl: env_1.env.databaseUrl,
});
