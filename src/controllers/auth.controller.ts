import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body ?? {};
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "email, name, and password are required" });
    }

    const result = await authService.signup({ email, name, password });
    return res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (
      message === "Invalid email" ||
      message === "Invalid name" ||
      message === "Password too short"
    ) {
      return res.status(400).json({ message });
    }
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

    const result = await authService.login({ email, password });
    return res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "Invalid email") {
      return res.status(400).json({ message });
    }
    if (message === "Invalid credentials") {
      return res.status(401).json({ message });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function logout(req: Request, res: Response) {
  // With JWT auth, logout is client-side (discard the token).
  // If you still use sessions anywhere, we clean it up as well.
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie("sid");
      res.sendStatus(204);
    });
    return;
  }
  res.sendStatus(204);
}
