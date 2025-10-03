const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

// Determine environment
const isProduction = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "Slavic Media API",
    description: "MongoDB-ExpressJS-NodeJS Restful API",
    version: "1.0.0",
  },
  host: isProduction
    ? "apislavic-media-git-main-adamsochorecs-projects.vercel.app"
    : "localhost:4000",
  schemes: isProduction ? ["https"] : ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Authentication token (Bearer)",
    },
  },
};

const outputFile = path.join(__dirname, "swagger.json");
const endpointsFiles = [path.join(__dirname, "src", "app.ts")];

// Generate swagger doc without starting the server
// This allows us to use this script in the build process
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated");

  // Only start server if not being called as part of build process
  if (
    process.env.NODE_ENV !== "production" &&
    process.argv[1].includes("swagger.js")
  ) {
    try {
      require(path.join(__dirname, "dist", "server"));
    } catch (err) {
      console.log("Server not started - this is expected during build");
    }
  }
});
