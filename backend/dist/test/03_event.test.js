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
const event_1 = __importDefault(require("../models/event"));
let token;
const eventData = {
    date: "2023-04-30T22:00:00.000Z",
    lat: 55.488265302135666,
    lng: 9.482358325733468,
    icon: "verified",
    description: "Company establishment",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield event_1.default.deleteMany({});
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield event_1.default.deleteMany({});
}));
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    token = yield (0, auth_1.registerAndLogin)();
}));
(0, vitest_1.describe)("Event CRUD", () => {
    let createdEventId;
    (0, vitest_1.it)("should create a new event", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/event")
            .set("auth-token", token)
            .send(eventData);
        (0, vitest_1.expect)(res.statusCode).toBe(201);
        (0, vitest_1.expect)(res.body._id).toBeDefined();
        createdEventId = res.body._id;
    }));
    (0, vitest_1.it)("should get all events", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/event").set("auth-token", token).send(eventData);
        const res = yield (0, supertest_1.default)(app_1.default).get("/event");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("should get an event by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app_1.default)
            .post("/event")
            .set("auth-token", token)
            .send(eventData);
        const eventId = createRes.body._id;
        const res = yield (0, supertest_1.default)(app_1.default).get(`/event/${eventId}`);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(eventId);
    }));
    (0, vitest_1.it)("should update an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app_1.default)
            .post("/event")
            .set("auth-token", token)
            .send(eventData);
        const eventId = createRes.body._id;
        const updated = Object.assign(Object.assign({}, eventData), { description: "Updated Description" });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/event/${eventId}`)
            .set("auth-token", token)
            .send(updated);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.description).toBe("Updated Description");
    }));
    (0, vitest_1.it)("should delete an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app_1.default)
            .post("/event")
            .set("auth-token", token)
            .send(eventData);
        const eventId = createRes.body._id;
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/event/${eventId}`)
            .set("auth-token", token);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.message).toMatch(/deleted successfully/i);
        // Confirm deletion
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/event/${eventId}`);
        (0, vitest_1.expect)(getRes.body).toEqual({});
    }));
});
