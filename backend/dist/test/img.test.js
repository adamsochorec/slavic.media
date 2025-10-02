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
const gallery_1 = __importDefault(require("../models/gallery"));
let token;
const testData = {
    index: 3,
    title: "Colorful Portrait",
    columns: [
        [
            {
                _id: "hvalp",
                alt: "Alt",
                title: "Title",
                flag: "dk",
            },
        ],
        [
            {
                _id: "2021-04-25-00693",
                alt: "Alt",
                title: "Title",
                flag: "cz",
            },
        ],
        [
            {
                _id: "2021-04-14-00608",
                alt: "Alt",
                title: "Title",
                flag: "cz",
            },
        ],
        [
            {
                _id: "2023-04-03-08707",
                alt: "Alt",
                title: "Title",
                flag: "dk",
            },
        ],
    ],
    description: "Description",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield gallery_1.default.deleteMany({});
    token = yield (0, auth_1.registerAndLogin)();
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield gallery_1.default.deleteMany({});
}));
(0, vitest_1.describe)("Img CRUD", () => {
    let createdID;
    (0, vitest_1.it)("should create a new img", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/img")
            .set("auth-token", token)
            .send(testData);
        (0, vitest_1.expect)(res.statusCode).toBe(201);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
        createdID = res.body._id;
    }));
    (0, vitest_1.it)("should get all reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/img").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get("/img");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("should get an img by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/img").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default).get(`/img/${testData._id}`);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(testData._id);
    }));
    (0, vitest_1.it)("should update an img", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/img").set("auth-token", token).send(testData);
        const updated = Object.assign(Object.assign({}, testData), { title: "Updated title" });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/img/${testData._id}`)
            .set("auth-token", token)
            .send(updated);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.title).toBe("Updated title");
    }));
    (0, vitest_1.it)("should delete an img", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/img").set("auth-token", token).send(testData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/img/${testData._id}`)
            .set("auth-token", token);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.message).toMatch(/deleted successfully/i);
        // Confirm deletion
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/img/${testData._id}`);
        (0, vitest_1.expect)(getRes.body).toEqual({});
    }));
});
