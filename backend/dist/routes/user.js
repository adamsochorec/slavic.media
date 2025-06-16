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
// Import the necessary modules
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user")); // User model to interact with the database
const bcrypt_1 = __importDefault(require("bcrypt")); // bcrypt to hash passwords
const validation_1 = require("../validation"); // Validation functions
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // jsonwebtoken to create authentication tokens
// Express router to define the routes
const router = (0, express_1.Router)();
// Allowed email domain
const allowedDomain = "slavic.media";
// Restrict registration in production
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only allow registration in non-production environments
        if (process.env.NODE_ENV === "production") {
            return res.status(403).json({
                error: "Registration is disabled in production environment",
            });
        }
        // Continue with existing registration logic for test environment
        const { error } = (0, validation_1.registerValidation)(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // Extract the domain from the email address
        const emailDomain = req.body.email.split("@")[1];
        // Check if the domain matches the allowed domain
        if (emailDomain !== allowedDomain) {
            return res.status(400).json({ error: "Email domain not allowed" });
        }
        // Check if the email is already registered
        // If the email is already registered, return an error message
        const emailExist = yield user_1.default.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Hash the password using bcrypt
        // The salt is a random value that is used to create the hash
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        // Create a new user object and save it to the database
        const userObject = new user_1.default({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Save the user object to the database
        // If the save is successful, return the user's id
        const savedUser = yield userObject.save();
        res.json({ error: null, data: savedUser._id });
    }
    catch (error) {
        // If there is an error, return a server error message
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Add admin seeding functionality
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME;
        if (!adminEmail || !adminPassword || !adminName) {
            throw new Error("Admin credentials not provided in environment variables");
        }
        const adminExists = yield user_1.default.findOne({ email: adminEmail });
        if (!adminExists) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(adminPassword, salt);
            yield user_1.default.create({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
            });
            console.log("Admin account seeded successfully");
        }
    }
    catch (error) {
        console.error("Admin seeding failed:", error);
    }
});
// Call seedAdmin when the app starts in production
if (process.env.NODE_ENV === "production") {
    seedAdmin();
}
// User login endpoint
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate user login info
        // If the validation fails, return an error message
        const { error } = (0, validation_1.loginValidation)(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
        // If login info is valid, find the user in the database
        const user = yield user_1.default.findOne({ email: req.body.email });
        // If the user does not exist, return an error message
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // If the user exists, check if the password is correct
        // If the password is incorrect, return an error message
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // If the password is correct, create an authentication token
        // The token includes the user's name and id
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            id: user._id,
        }, process.env.TOKEN_SECRET || "your_default_secret", {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });
        // Attach the authentication token to the header and return it in the response
        res.header("auth-token", token).json({
            error: null,
            data: { token },
        });
    }
    catch (error) {
        // If there is an error, return a server error message
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Export the router to be used in other parts of the application
exports.default = router;
