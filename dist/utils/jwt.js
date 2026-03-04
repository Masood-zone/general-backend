"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthToken = signAuthToken;
exports.verifyAuthToken = verifyAuthToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function signAuthToken(payload) {
    return jsonwebtoken_1.default.sign({
        email: payload.email,
        name: payload.name,
    }, env_1.env.jwtSecret, {
        subject: payload.userId,
        expiresIn: env_1.env.jwtExpiresIn,
    });
}
function verifyAuthToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
    const userId = typeof decoded.sub === "string" ? decoded.sub : undefined;
    const email = typeof decoded.email === "string" ? decoded.email : undefined;
    const name = typeof decoded.name === "string" ? decoded.name : undefined;
    if (!userId || !email || !name) {
        throw new Error("Invalid token");
    }
    return { userId, email, name };
}
