import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../utils/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice("bearer ".length).trim();
    try {
      const payload = verifyAuthToken(token);
      req.auth = { userId: payload.userId, email: payload.email, name: payload.name };
      return next();
    } catch {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  // Backward-compatible session auth (optional).
  if (req.session?.userId) {
    req.auth = { userId: req.session.userId };
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}
