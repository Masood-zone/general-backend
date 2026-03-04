"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const user_queries_1 = require("../queries/user.queries");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
function toPublicUser(user) {
    const publicUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };
    return publicUser;
}
async function signup(input) {
    const email = input.email.trim().toLowerCase();
    const name = input.name.trim();
    const password = input.password;
    if (!email.includes("@"))
        throw new Error("Invalid email");
    if (name.length < 2)
        throw new Error("Invalid name");
    if (password.length < 8)
        throw new Error("Password too short");
    const existing = await (0, user_queries_1.findUserByEmail)(email);
    if (existing)
        throw new Error("User already exists");
    const passwordHash = await (0, hash_1.hashPassword)(password);
    const user = await (0, user_queries_1.createUser)({ email, name, passwordHash });
    const token = (0, jwt_1.signAuthToken)({
        userId: user.id,
        email: user.email,
        name: user.name,
    });
    return { token, user: toPublicUser(user) };
}
async function login(input) {
    const email = input.email.trim().toLowerCase();
    const password = input.password;
    if (!email.includes("@"))
        throw new Error("Invalid email");
    const user = await (0, user_queries_1.findUserByEmail)(email);
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await (0, hash_1.verifyPassword)(password, user.passwordHash);
    if (!valid)
        throw new Error("Invalid credentials");
    const token = (0, jwt_1.signAuthToken)({ userId: user.id, email: user.email, name: user.name });
    return { token, user: toPublicUser(user) };
}
