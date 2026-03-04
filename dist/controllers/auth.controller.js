"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
const authService = __importStar(require("../services/auth.service"));
async function signup(req, res) {
    try {
        const { email, name, password } = req.body ?? {};
        if (typeof email !== "string" ||
            typeof name !== "string" ||
            typeof password !== "string") {
            return res
                .status(400)
                .json({ message: "email, name, and password are required" });
        }
        const result = await authService.signup({ email, name, password });
        return res.status(201).json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        if (message === "Invalid email" ||
            message === "Invalid name" ||
            message === "Password too short") {
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
async function login(req, res) {
    try {
        const { email, password } = req.body ?? {};
        if (typeof email !== "string" || typeof password !== "string") {
            return res
                .status(400)
                .json({ message: "email and password are required" });
        }
        const result = await authService.login({ email, password });
        return res.json(result);
    }
    catch (error) {
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
function logout(req, res) {
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
