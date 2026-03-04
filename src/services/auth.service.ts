import { createUser, findUserByEmail } from "../queries/user.queries";
import { hashPassword, verifyPassword } from "../utils/hash";
import { signAuthToken } from "../utils/jwt";

type PublicUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}) {
  const publicUser: PublicUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };

  return publicUser;
}

export async function signup(input: {
  email: string;
  name: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  const password = input.password;

  if (!email.includes("@")) throw new Error("Invalid email");
  if (name.length < 2) throw new Error("Invalid name");
  if (password.length < 8) throw new Error("Password too short");

  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const passwordHash = await hashPassword(password);
  const user = await createUser({ email, name, passwordHash });

  const token = signAuthToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  return { token, user: toPublicUser(user) };
}

export async function login(input: { email: string; password: string }) {
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!email.includes("@")) throw new Error("Invalid email");

  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = signAuthToken({ userId: user.id, email: user.email, name: user.name });
  return { token, user: toPublicUser(user) };
}
