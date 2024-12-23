"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    name: { type: String, required: true, maxlength: 100 },
    department: { type: String, required: true, maxlength: 100 },
    flag: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    birthday: { type: Date, required: true },
    linkedin: { type: String, maxlength: 100 },
    github: { type: String, maxlength: 100 },
});
var employeeModel = mongoose_1.default.model("Employee", employeeSchema);
exports.default = employeeModel;
