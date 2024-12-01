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
// Set the environment variable to "test"
// This is important to ensure that the tests do not affect the production database
process.env.NODE_ENV = "test";
// Import the necessary models
// These models are used to interact with the database
const article_1 = __importDefault(require("../models/article"));
const assets_1 = __importDefault(require("../models/assets"));
const employee_1 = __importDefault(require("../models/employee"));
const event_1 = __importDefault(require("../models/event"));
const img_1 = __importDefault(require("../models/img"));
const review_1 = __importDefault(require("../models/review"));
const user_1 = __importDefault(require("../models/user"));
const video_1 = __importDefault(require("../models/video"));
// Function to clean up the database
const cleanDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const models = [article_1.default, assets_1.default, employee_1.default, event_1.default, img_1.default, review_1.default, user_1.default, video_1.default];
    for (const model of models) {
        yield model.deleteMany({});
    }
});
// Before each test, clean up the database
// This ensures that each test starts with a clean slate
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield cleanDatabase();
}));
// After each test, clean up the database
// This ensures that the changes made by the test do not affect other tests
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield cleanDatabase();
}));
