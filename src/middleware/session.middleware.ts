import session from "express-session";
import connectPg from "connect-pg-simple";
import { env } from "../config/env";

const PgSession = connectPg(session);

export const sessionMiddleware = session({
  name: "sid",
  store: new PgSession({
    conString: env.databaseUrl,
  }),
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // true behind HTTPS
    maxAge: 1000 * 60 * 60 * 24,
  },
});
