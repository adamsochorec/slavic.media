"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_autogen_1 = require("swagger-autogen");
var server_1 = require("./src/server");
var doc = {
    info: {
        title: "Slavic Media API",
        description: "MongoDB-ExpressJS-NodeJS Restful API",
    },
    host: "localhost:".concat(server_1.default),
    schemes: ["http"],
};
var outputFile = "./swagger.json";
var endpointsFiles = ["./src/server.ts"];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(function () {
    require("./src/server");
});
