"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const user_queries_1 = require("../queries/user.queries");
const hash_1 = require("../utils/hash");
async function signup(email, password) {
    const existing = await (0, user_queries_1.findUserByEmail)(email);
    if (existing)
        throw new Error("User already exists");
    const passwordHash = await (0, hash_1.hashPassword)(password);
    return (0, user_queries_1.createUser)(email, passwordHash);
}
async function login(email, password) {
    const user = await (0, user_queries_1.findUserByEmail)(email);
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await (0, hash_1.verifyPassword)(password, user.passwordHash);
    if (!valid)
        throw new Error("Invalid credentials");
    return user;
}
