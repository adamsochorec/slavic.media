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
exports.testUser = void 0;
exports.registerAndLogin = registerAndLogin;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
exports.testUser = {
    name: "Tester",
    email: "test@slavic.media",
    password: "chelyabinsk",
};
function registerAndLogin() {
    return __awaiter(this, arguments, void 0, function* (user = exports.testUser) {
        var _a, _b;
        // Register user (ignore errors if already exists)
        yield (0, supertest_1.default)(app_1.default).post("/user/register").send(user);
        // Login and get token
        const res = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: user.email,
            password: user.password,
        });
        if (!((_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.token)) {
            throw new Error("Failed to get auth token");
        }
        return res.body.data.token;
    });
}
