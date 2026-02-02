import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.signup(email, password);
  req.session.userId = user.id;
  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  req.session.userId = user.id;
  res.json({ id: user.id, email: user.email });
}

export function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.sendStatus(200);
  });
}
