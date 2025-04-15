"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
require("dotenv-flow").config();
const app = (0, express_1.default)();
// Serve static files with caching headers
const staticOptions = {
    maxAge: "365d",
    etag: false,
    lastModified: false,
};
// Enable CORS using the cors middleware
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Load and serve Swagger documentation
const swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none !important; }",
};
const swaggerDefinition = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "swagger.json"), "utf8"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition, swaggerOptions));
const article_1 = __importDefault(require("./routes/article"));
const img_1 = __importDefault(require("./routes/img"));
const video_1 = __importDefault(require("./routes/video"));
const auth_1 = __importDefault(require("./routes/auth"));
const employee_1 = __importDefault(require("./routes/employee"));
const legal_1 = __importDefault(require("./routes/legal"));
const review_1 = __importDefault(require("./routes/review"));
const event_1 = __importDefault(require("./routes/event"));
require("dotenv-flow").config();
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
app.use("/event", event_1.default);
// Serve static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "dist"), staticOptions));
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
