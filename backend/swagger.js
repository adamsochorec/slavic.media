const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const doc = {
  info: {
    title: "Slavic Media API",
    description: "MongoDB-ExpressJS-NodeJS Restful API",
  },
  host: "localhost:4000",
  schemes: ["http"],
};

const outputFile = path.join(__dirname, "swagger.json");
const endpointsFiles = [path.join(__dirname, "src", "app.ts")];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require(path.join(__dirname, "dist", "server"));
});
