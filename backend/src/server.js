"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var body_parser_1 = require("body-parser");
var swagger_ui_express_1 = require("swagger-ui-express");
var yamljs_1 = require("yamljs");
var cors_1 = require("cors");
var path_1 = require("path");
require("dotenv-flow").config();
var app = (0, express_1.default)();
// Serve static files with caching headers
var staticOptions = {
    maxAge: "365d",
    etag: false,
    lastModified: false,
};
// Enable CORS using the cors middleware
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Load and serve Swagger documentation
var swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none !important; }",
};
var swaggerDefinition = yamljs_1.default.load(path_1.default.join(__dirname, "..", "swagger.yaml"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDefinition, swaggerOptions));
var article_1 = require("./routes/article");
var images_1 = require("./routes/images");
var video_1 = require("./routes/video");
var auth_1 = require("./routes/auth");
var employee_1 = require("./routes/employee");
var legal_1 = require("./routes/legal");
var review_1 = require("./routes/review");
var event_1 = require("./routes/event");
var services_1 = require("./routes/services");
var img_1 = require("./routes/img");
var imgGallery_1 = require("./routes/imgGallery");
require("dotenv-flow").config();
// Connect to MongoDB
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.DBHOST)
    .catch(function (error) { return console.log("Error connecting to MongoDB:" + error); });
// Log successful MongoDB connection
mongoose_1.default.connection.once("open", function () {
    return console.log("Connected successfully to MongoDB");
});
// Root route
app.get("/", function (req, res) {
    res.status(200).send({ message: "Welcome to the backend" });
});
// Route handlers
app.use("/blog", article_1.default);
app.use("/images", images_1.default);
app.use("/video", video_1.default);
app.use("/user", auth_1.default);
app.use("/employee", employee_1.default);
app.use("/legal", legal_1.default);
app.use("/review", review_1.default);
app.use("/event", event_1.default);
app.use("/services", services_1.default);
app.use("/img", img_1.default);
app.use("/gallery/img", imgGallery_1.default);
// Serve static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "dist"), staticOptions));
// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
// Start the server
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
exports.default = app;
