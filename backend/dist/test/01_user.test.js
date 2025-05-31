"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const user_1 = __importDefault(require("../models/user"));
const userData = {
    name: "Test User",
    email: "test@slavic.media",
    password: "password123",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
}));
(0, vitest_1.describe)("User Registration and Login", () => {
    (0, vitest_1.it)("registers a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.error).toBeNull();
        (0, vitest_1.expect)(res.body.data).toBeDefined();
    }));
    (0, vitest_1.it)("logs in with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/user/login")
            .send({ email: userData.email, password: userData.password });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.data.token).toBeDefined();
    }));
    (0, vitest_1.it)("does not allow registering with the same email twice", () => __awaiter(void 0, void 0, void 0, function* () {
        // First registration should succeed
        const firstRes = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        (0, vitest_1.expect)(firstRes.status).toBe(200);
        (0, vitest_1.expect)(firstRes.body.error).toBeNull();
        // Second registration with the same email should fail
        const secondRes = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        (0, vitest_1.expect)(secondRes.status).toBe(400);
        (0, vitest_1.expect)(secondRes.body.error).toBe("Email already exists");
    }));
});
