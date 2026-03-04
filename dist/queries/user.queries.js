"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserPassword = exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const prisma_1 = require("../config/prisma");
const findUserByEmail = (email) => prisma_1.prisma.user.findUnique({ where: { email } });
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => prisma_1.prisma.user.findUnique({ where: { id } });
exports.findUserById = findUserById;
const createUser = (input) => prisma_1.prisma.user.create({
    data: { email: input.email, name: input.name, passwordHash: input.passwordHash },
});
exports.createUser = createUser;
const updateUserPassword = (id, passwordHash) => prisma_1.prisma.user.update({
    where: { id },
    data: { passwordHash },
});
exports.updateUserPassword = updateUserPassword;
const deleteUser = (id) => prisma_1.prisma.user.delete({
    where: { id },
});
exports.deleteUser = deleteUser;
