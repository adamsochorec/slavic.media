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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary modules
var express_1 = require("express");
var user_1 = require("../models/user"); // User model to interact with the database
var bcrypt_1 = require("bcrypt"); // bcrypt to hash passwords
var validation_1 = require("../validation"); // Validation functions
var jsonwebtoken_1 = require("jsonwebtoken"); // jsonwebtoken to create authentication tokens
// Express router to define the routes
var router = (0, express_1.Router)();
// Allowed email domain
var allowedDomain = "slavic.media";
// User registration endpoint
router.post("/675c6906f759b4d2938177b9", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, emailDomain, emailExist, salt, hashedPassword, userObject, savedUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                error = (0, validation_1.registerValidation)(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                }
                emailDomain = req.body.email.split("@")[1];
                // Check if the domain matches the allowed domain
                if (emailDomain !== allowedDomain) {
                    return [2 /*return*/, res.status(400).json({ error: "Email domain not allowed" })];
                }
                return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
            case 1:
                emailExist = _a.sent();
                if (emailExist) {
                    return [2 /*return*/, res.status(400).json({ error: "Email already exists" })];
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 3:
                hashedPassword = _a.sent();
                userObject = new user_1.default({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                return [4 /*yield*/, userObject.save()];
            case 4:
                savedUser = _a.sent();
                res.json({ error: null, data: savedUser._id });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                // If there is an error, return a server error message
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// User login endpoint
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, validPassword, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                error = (0, validation_1.loginValidation)(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({
                            error: error.details[0].message,
                        })];
                }
                return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                // If the user does not exist, return an error message
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid credentials" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user.password)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid credentials" })];
                }
                token = jsonwebtoken_1.default.sign({
                    name: user.name,
                    id: user._id,
                }, process.env.TOKEN_SECRET || "your_default_secret", {
                    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
                });
                // Attach the authentication token to the header and return it in the response
                res.header("auth-token", token).json({
                    error: null,
                    data: { token: token },
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                // If there is an error, return a server error message
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Export the router to be used in other parts of the application
exports.default = router;
