const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const doc = {
  info: {
    title: "Slavic Media API",
    description: "MongoDB-ExpressJS-NodeJS Restful API",
  },
  host: "localhost:4000", // Change this to your host
  schemes: ["http"], // Change this to 'https' if you are using HTTPS
};

const outputFile = path.join(__dirname, "swagger-output.json");
const endpointsFiles = [path.join(__dirname, "src", "server.ts")]; // Change this to your main server file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require(path.join(__dirname, "src", "server")); // Your project's root file
});
