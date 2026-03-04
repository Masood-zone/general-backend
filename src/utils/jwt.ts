import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export type AuthTokenPayload = {
  userId: string;
  email: string;
  name: string;
};

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(
    {
      email: payload.email,
      name: payload.name,
    },
    env.jwtSecret,
    {
      subject: payload.userId,
      expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    }
  );
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

  const userId = typeof decoded.sub === "string" ? decoded.sub : undefined;
  const email = typeof decoded.email === "string" ? decoded.email : undefined;
  const name = typeof decoded.name === "string" ? decoded.name : undefined;

  if (!userId || !email || !name) {
    throw new Error("Invalid token");
  }

  return { userId, email, name };
}
