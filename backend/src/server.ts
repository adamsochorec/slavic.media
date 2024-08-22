import express, { Request, Response } from "express";
// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";
// Import body-parser to parse incoming request bodies
import bodyParser from "body-parser";
// Initialize an Express application
const app = express();
// Import a custom token verification middleware function
import { verifyToken } from "./validation";

// Swagger dependencies for API documentation
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

// Import CORS to enable Cross-Origin Resource Sharing
import cors from "cors";
import path from "path";

// Load environment variables from .env files using dotenv-flow
require("dotenv-flow").config();

// Setup CORS middleware to handle CORS preflight requests and responses
app.use((req: Request, res: Response, next: Function) => {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  // Allow specific headers in requests
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  // Allow specific HTTP methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );

  // Move to the next middleware function
  next();
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Setup Swagger documentation
const swaggerDefinition = yaml.load(path.join("backend", "..", "swagger.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Import routes for documents and authentication
import documentRoutes from "./routes/article";
import authRoutes from "./routes/auth";

// Load environment variables (again, for good measure)
require("dotenv-flow").config();

// Middleware to parse requests of content-type JSON
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
// Connect to MongoDB using Mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DBHOST as string)
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

// Log a message once connected to MongoDB
mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Define a welcome route
app.get("/", (req: Request, res: Response) => {
  // Send a welcome message with a 200 OK status
  res.status(200).send({ message: "Welcome to the backend" });
});

// Define routes for CRUD operations on documents
app.use("/blog/articles", documentRoutes);

// Define routes for user authentication
app.use("/user", authRoutes);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Define the port number the server will listen on
const PORT = process.env.PORT || 4000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

// Export the app module for testing or other uses
export default app;
