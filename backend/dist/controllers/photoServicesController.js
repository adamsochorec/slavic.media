"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotoServicesWithImages = void 0;
const img_1 = __importDefault(require("../models/img"));
const photoServices_1 = __importDefault(require("../models/photoServices"));
const getPhotoServicesWithImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photoServices = yield photoServices_1.default.find();
        const imageIds = photoServices.flatMap((service) => [
            ...service.column1,
            ...service.column2,
            ...service.column3,
            ...service.column4,
        ]);
        const images = yield img_1.default.find({ _id: { $in: imageIds } });
        const photoServicesWithImages = photoServices.map((service) => (Object.assign(Object.assign({}, service.toObject()), { column1: service.column1.map((id) => images.find((img) => img._id.equals(id))), column2: service.column2.map((id) => images.find((img) => img._id.equals(id))), column3: service.column3.map((id) => images.find((img) => img._id.equals(id))), column4: service.column4.map((id) => images.find((img) => img._id.equals(id))) })));
        res.json(photoServicesWithImages);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPhotoServicesWithImages = getPhotoServicesWithImages;
