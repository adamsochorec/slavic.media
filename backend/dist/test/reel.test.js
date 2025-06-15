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
const auth_1 = require("../auth");
const user_1 = __importDefault(require("../models/user"));
const reel_1 = __importDefault(require("../models/reel"));
let token;
const testData = {
    _id: "DBqXwkhI8nH",
    platform: "instagram",
    flag: "no",
    url: "instagram.com/reel/DBqXwkhI8nH",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield reel_1.default.deleteMany({});
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield reel_1.default.deleteMany({});
}));
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    token = yield (0, auth_1.registerAndLogin)();
}));
(0, vitest_1.describe)("Reel CRUD", () => {
    let createdID;
    (0, vitest_1.it)("should create a new reel", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/reel")
            .set("auth-token", token)
            .send(testData);
        (0, vitest_1.expect)(res.statusCode).toBe(201);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
        createdID = res.body._id;
    }));
    (0, vitest_1.it)("should get all reels", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/reel").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get("/reel");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("should get an reel by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/reel").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get(`/reel/${testData._id}`);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
    }));
    (0, vitest_1.it)("should update an reel", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/reel").set("auth-token", token).send(testData);
        const updated = Object.assign(Object.assign({}, testData), { platform: "tiktok" });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/reel/${testData._id}`)
            .set("auth-token", token)
            .send(updated);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.platform).toBe("tiktok");
    }));
    (0, vitest_1.it)("should delete an reel", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/reel").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/reel/${testData._id}`)
            .set("auth-token", token);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.message).toMatch(/deleted successfully/i);
        // Confirm deletion
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/reel/${testData._id}`);
        (0, vitest_1.expect)(getRes.body).toEqual({});
    }));
});
