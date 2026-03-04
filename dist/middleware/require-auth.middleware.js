"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const authHeader = req.header("authorization");
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
        const token = authHeader.slice("bearer ".length).trim();
        try {
            const payload = (0, jwt_1.verifyAuthToken)(token);
            req.auth = { userId: payload.userId, email: payload.email, name: payload.name };
            return next();
        }
        catch {
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
