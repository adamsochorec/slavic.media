"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
require("dotenv-flow").config();
const app = (0, express_1.default)();
// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Load and serve Swagger documentation
const swaggerDefinition = yamljs_1.default.load(path_1.default.join("backend", "..", "swagger.yaml"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition));
const article_1 = __importDefault(require("./routes/article"));
const img_1 = __importDefault(require("./routes/img"));
const video_1 = __importDefault(require("./routes/video"));
const auth_1 = __importDefault(require("./routes/auth"));
const employee_1 = __importDefault(require("./routes/employee"));
const legal_1 = __importDefault(require("./routes/legal"));
const review_1 = __importDefault(require("./routes/review"));
require("dotenv-flow").config();
// Middleware to parse JSON bodies (duplicate, can be removed)
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.DBHOST)
    .catch((error) => console.log("Error connecting to MongoDB:" + error));
// Log successful MongoDB connection
mongoose_1.default.connection.once("open", () => console.log("Connected successfully to MongoDB"));
// Root route
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the backend" });
});
// Route handlers
app.use("/blog", article_1.default);
app.use("/img", img_1.default);
app.use("/video", video_1.default);
app.use("/user", auth_1.default);
app.use("/employee", employee_1.default);
app.use("/legal", legal_1.default);
app.use("/review", review_1.default);
// Serve static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
exports.default = app;
