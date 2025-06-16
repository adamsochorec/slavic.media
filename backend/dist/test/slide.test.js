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
const slide_1 = __importDefault(require("../models/slide"));
let token;
const testData = {
    _id: "20240312_SLAVIC-MEDIA0583",
    index: 1,
    log: "Log",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield slide_1.default.deleteMany({});
    token = yield (0, auth_1.registerAndLogin)();
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield slide_1.default.deleteMany({});
}));
(0, vitest_1.describe)("Slide CRUD", () => {
    let createdID;
    (0, vitest_1.it)("should create a new slide", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/slide")
            .set("auth-token", token)
            .send(testData);
        (0, vitest_1.expect)(res.statusCode).toBe(201);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
        createdID = res.body._id;
    }));
    (0, vitest_1.it)("should get all slides", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/slide").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get("/slide");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("should get an slide by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/slide").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get(`/slide/${testData._id}`);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
    }));
    (0, vitest_1.it)("should update an slide", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/slide").set("auth-token", token).send(testData);
        const updated = Object.assign(Object.assign({}, testData), { log: "Updated log" });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/slide/${testData._id}`)
            .set("auth-token", token)
            .send(updated);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.log).toBe("Updated log");
    }));
    (0, vitest_1.it)("should delete an slide", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/slide").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/slide/${testData._id}`)
            .set("auth-token", token);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.message).toMatch(/deleted successfully/i);
        // Confirm deletion
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/slide/${testData._id}`);
        (0, vitest_1.expect)(getRes.body).toEqual({});
    }));
});
