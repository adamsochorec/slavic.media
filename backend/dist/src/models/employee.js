"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const EmployeeSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    name: { type: String, required: true, maxlength: 100 },
    department: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    flag: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    birthday: { type: Date, required: true },
    linkedin: { type: String, maxlength: 100 },
    github: { type: String, maxlength: 100 },
});
// Auto-increment index before saving a new document
EmployeeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew && (this.index === undefined || this.index === null)) {
            const lastEmployee = yield mongoose_1.default
                .model("Employee")
                .findOne({})
                .sort({ index: -1 })
                .select("index")
                .exec();
            this.index =
                lastEmployee && typeof lastEmployee.index === "number"
                    ? lastEmployee.index + 1
                    : 1;
        }
        next();
    });
});
const EmployeeModel = mongoose_1.default.model("Employee", EmployeeSchema);
exports.default = EmployeeModel;
