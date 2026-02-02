"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const session_middleware_1 = require("./middleware/session.middleware");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(session_middleware_1.sessionMiddleware);
app.use(routes_1.default);
app.listen(env_1.env.port, () => {
    console.log(`General server running on: http://localhost:${env_1.env.port}`);
});
