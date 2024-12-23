import swaggerAutogen from "swagger-autogen";
import PORT from "./src/server";

const doc = {
  info: {
    title: "Slavic Media API",
    description: "MongoDB-ExpressJS-NodeJS Restful API",
  },
  host: `localhost:${PORT}`,
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/server.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require("./src/server");
});
