"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import Mongoose for MongoDB object modeling
const mongoose_1 = __importDefault(require("mongoose"));
// Import body-parser to parse incoming request bodies
const body_parser_1 = __importDefault(require("body-parser"));
// Initialize an Express application
const app = (0, express_1.default)();
// Swagger dependencies for API documentation
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env files using dotenv-flow
require("dotenv-flow").config();
// Setup CORS middleware to handle CORS preflight requests and responses
app.use((req, res, next) => {
    // Allow requests from any origin
    res.header("Access-Control-Allow-Origin", "*");
    // Allow specific headers in requests
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    // Allow specific HTTP methods
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    // Move to the next middleware function
    next();
});
// Middleware to parse JSON request bodies
app.use(body_parser_1.default.json());
// Setup Swagger documentation
const swaggerDefinition = yamljs_1.default.load(path_1.default.join("backend", "..", "swagger.yaml"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition));
// Import routes for documents and authentication
const article_1 = __importDefault(require("./routes/article"));
const photo_1 = __importDefault(require("./routes/photo"));
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables (again, for good measure)
require("dotenv-flow").config();
// Middleware to parse requests of content-type JSON
app.use(body_parser_1.default.json());
// Connect to MongoDB using Mongoose
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.DBHOST)
    .catch((error) => console.log("Error connecting to MongoDB:" + error));
// Log a message once connected to MongoDB
mongoose_1.default.connection.once("open", () => console.log("Connected successfully to MongoDB"));
// Define a welcome route
app.get("/", (req, res) => {
    // Send a welcome message with a 200 OK status
    res.status(200).send({ message: "Welcome to the backend" });
});
// Define routes for CRUD operations on documents
app.use("/blog/articles", article_1.default);
app.use("/photo", photo_1.default);
app.use("/user", auth_1.default);
// Serve static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
// Define the port number the server will listen on
const PORT = process.env.PORT || 4000;
// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
// Export the app module for testing or other uses
exports.default = app;
