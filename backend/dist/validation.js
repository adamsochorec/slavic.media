"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginValidation = exports.registerValidation = void 0;
// Import Joi for data validation
const joi_1 = __importDefault(require("joi"));
// Import JSON Web Token (JWT) for token-based authentication
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to validate user registration data
const registerValidation = (data) => {
    // Define the schema for validation
    const schema = joi_1.default.object({
        // Name must be a string between 6 and 255 characters and is required
        name: joi_1.default.string().min(6).max(255).required(),
        // Email must be a string between 6 and 255 characters and is required
        email: joi_1.default.string().min(6).max(255).required().email(),
        // Password must be a string between 6 and 255 characters and is required
        password: joi_1.default.string().min(6).max(255).required(),
    });
    // Validate the data against the schema
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
// Function to validate user login data
const loginValidation = (data) => {
    // Define the schema for validation
    const schema = joi_1.default.object({
        // Email must be a string between 6 and 255 characters and is required
        email: joi_1.default.string().min(6).max(255).required().email(),
        // Password must be a string between 6 and 255 characters and is required
        password: joi_1.default.string().min(6).max(255).required(),
    });
    // Validate the data against the schema
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Retrieve the token from the request header
    const token = req.header("auth-token");
    // If no token is found, respond with an access denied error
    if (!token)
        return res.status(401).json({ error: "Access Denied" });
    try {
        // Verify the token using the secret key from environment variables
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // Attach the verified token payload to the request object
        req.user = verified;
        // Proceed to the next middleware function
        next();
    }
    catch (error) {
        // If token verification fails, respond with an invalid token error
        res.status(400).json({ error: "Token is not valid" });
    }
};
exports.verifyToken = verifyToken;
