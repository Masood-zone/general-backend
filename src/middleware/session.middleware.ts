import session from "express-session";
import connectPg from "connect-pg-simple";
import { env } from "../config/env";

const PgSession = connectPg(session);

const sessionSecret = env.sessionSecret;
if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET is required when using sessionMiddleware. Set it in your .env"
  );
}

export const sessionMiddleware = session({
  name: "sid",
  store: new PgSession({
    conString: env.databaseUrl,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // true behind HTTPS
    maxAge: 1000 * 60 * 60 * 24,
  },
});
