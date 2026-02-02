import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await authService.signup(email, password);
    req.session.userId = user.id;
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "User already exists") {
      return res.status(409).json({ message });
    }
    // Prisma errors often show up here in production; keep response generic.
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await authService.login(email, password);
    req.session.userId = user.id;
    return res.json({ id: user.id, email: user.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "Invalid credentials") {
      return res.status(401).json({ message });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.sendStatus(200);
  });
}
