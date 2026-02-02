"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const env_1 = require("../config/env");
const PgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
exports.sessionMiddleware = (0, express_session_1.default)({
    name: "sid",
    store: new PgSession({
        conString: env_1.env.databaseUrl,
    }),
    secret: env_1.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // true behind HTTPS
        maxAge: 1000 * 60 * 60 * 24,
    },
});
