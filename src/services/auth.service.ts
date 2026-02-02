import { createUser, findUserByEmail } from "../queries/user.queries";
import { hashPassword, verifyPassword } from "../utils/hash";

export async function signup(email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const passwordHash = await hashPassword(password);
  return createUser(email, passwordHash);
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  return user;
}
