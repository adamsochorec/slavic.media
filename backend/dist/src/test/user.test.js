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
const userData = {
    name: "Tester",
    email: "test@slavic.media",
    password: "chelyabinsk",
};
(0, vitest_1.describe)("User Registration and Login", () => {
    (0, vitest_1.it)("registers a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.error).toBeNull();
        (0, vitest_1.expect)(res.body.data).toBeDefined();
    }));
    (0, vitest_1.it)("logs in with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        // Register first
        yield (0, supertest_1.default)(app_1.default).post("/user/register").send(userData);
        // Wait a bit to ensure registration is complete
        yield new Promise((resolve) => setTimeout(resolve, 100));
        // Try login
        const res = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: userData.email,
            password: userData.password,
        });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.data.token).toBeDefined();
    }));
});
