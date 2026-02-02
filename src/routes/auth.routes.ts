import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import { requireAuth } from "../middleware/require-auth.middleware";

const router = Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", requireAuth, controller.logout);

export default router;
