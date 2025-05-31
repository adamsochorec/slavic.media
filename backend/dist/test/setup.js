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
// Set the environment variable to "test"
process.env.NODE_ENV = "test";
// Import the necessary models (use import for TypeScript)
const employee_1 = __importDefault(require("../models/employee"));
const event_1 = __importDefault(require("../models/event"));
const gallery_1 = __importDefault(require("../models/gallery"));
const img_1 = __importDefault(require("../models/img"));
const reel_1 = __importDefault(require("../models/reel"));
const review_1 = __importDefault(require("../models/review"));
const img_2 = __importDefault(require("../models/img"));
const img_3 = __importDefault(require("../models/img"));
const user_1 = __importDefault(require("../models/user"));
// Helper function to clear all collections
const clearCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        employee_1.default.deleteMany({}),
        event_1.default.deleteMany({}),
        gallery_1.default.deleteMany({}),
        img_1.default.deleteMany({}),
        reel_1.default.deleteMany({}),
        review_1.default.deleteMany({}),
        img_2.default.deleteMany({}),
        img_3.default.deleteMany({}),
        user_1.default.deleteMany({}),
    ]);
});
// Before each test, clean up the database
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearCollections();
}));
// After each test, clean up the database
(0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearCollections();
}));
