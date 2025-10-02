import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { verifyToken } from "./validation";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";
import fs from "fs";

// Only use dotenv-flow in development, not in production (like Vercel)
if (process.env.NODE_ENV !== "production") {
  require("dotenv-flow").config();
}

const app = express();

// Serve static files with caching headers
const staticOptions = {
  maxAge: "365d",
  etag: false,
  lastModified: false,
};

// Enable CORS using the cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load and serve Swagger documentation
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none !important; }",
};
const swaggerDefinition = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "swagger.json"), "utf8")
);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition, swaggerOptions)
);

import imageRoutes from "./routes/img";
import videoRoutes from "./routes/video";
import userRoutes from "./routes/user";
import employeeRoutes from "./routes/employee";
import reviewRoutes from "./routes/review";
import eventRoutes from "./routes/event";
import slideRoutes from "./routes/slide";
import reelRoutes from "./routes/reel";
import newsletterRoutes from "./routes/newsletter";

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DBHOST as string)
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

// Log successful MongoDB connection
mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the backend" });
});

// Route handlers
app.use("/img", imageRoutes);
app.use("/video", videoRoutes);
app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);
app.use("/review", reviewRoutes);
app.use("/event", eventRoutes);
app.use("/reel", reelRoutes);
app.use("/slide", slideRoutes);
app.use("/newsletter", newsletterRoutes);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist"), staticOptions));

// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
export default app;
