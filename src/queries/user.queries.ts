import { prisma } from "../config/prisma";

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const createUser = (input: {
  email: string;
  name: string;
  passwordHash: string;
}) =>
  prisma.user.create({
    data: { email: input.email, name: input.name, passwordHash: input.passwordHash },
  });

export const updateUserPassword = (id: string, passwordHash: string) =>
  prisma.user.update({
    where: { id },
    data: { passwordHash },
  });

export const deleteUser = (id: string) =>
  prisma.user.delete({
    where: { id },
  });
