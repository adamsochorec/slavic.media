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
const employee_1 = __importDefault(require("../models/employee"));
let token;
const employeeData = {
    _id: "rasmus",
    name: "Rasmus Sorensen",
    index: 11,
    department: "Engineering",
    description: "A test employee",
    flag: "dk",
    email: "rasmus@slavic.media",
    birthday: "1999-01-03",
    linkedin: "https://linkedin.com/in/slavicmedia",
    github: "https://github.com/slavicmedia",
};
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield employee_1.default.deleteMany({});
}));
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    yield employee_1.default.deleteMany({});
}));
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    token = yield (0, auth_1.registerAndLogin)();
}));
(0, vitest_1.describe)("Employee CRUD", () => {
    let createdEmployeeId;
    (0, vitest_1.it)("should create a new employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/employee")
            .set("auth-token", token)
            .send(employeeData);
        (0, vitest_1.expect)(res.statusCode).toBe(201);
        (0, vitest_1.expect)(res.body._id).toBe(employeeData._id);
        createdEmployeeId = res.body._id;
    }));
    (0, vitest_1.it)("should get all employees", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/employee")
            .set("auth-token", token)
            .send(employeeData);
        const res = yield (0, supertest_1.default)(app_1.default).get("/employee");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("should get an employee by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/employee")
            .set("auth-token", token)
            .send(employeeData);
        const res = yield (0, supertest_1.default)(app_1.default).get(`/employee/${employeeData._id}`);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(employeeData._id);
    }));
    (0, vitest_1.it)("should update an employee", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/employee")
            .set("auth-token", token)
            .send(employeeData);
        const updated = Object.assign(Object.assign({}, employeeData), { name: "Updated Name" });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/employee/${employeeData._id}`)
            .set("auth-token", token)
            .send(updated);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.name).toBe("Updated Name");
    }));
    (0, vitest_1.it)("should delete an employee", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/employee")
            .set("auth-token", token)
            .send(employeeData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/employee/${employeeData._id}`)
            .set("auth-token", token);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.message).toMatch(/deleted successfully/i);
        // Confirm deletion
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/employee/${employeeData._id}`);
        (0, vitest_1.expect)(getRes.body).toEqual({});
    }));
});
