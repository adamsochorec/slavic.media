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
const express_1 = require("express");
const imgGallery_1 = __importDefault(require("../models/imgGallery"));
const img_1 = __importDefault(require("../models/img"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    imgGallery_1.default
        .create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    imgGallery_1.default
        .find({}, fields)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    imgGallery_1.default
        .findById(req.params.id, fields)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read galleries with images - GET
router.get("/with-images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const galleries = yield imgGallery_1.default.find({});
        const galleriesWithImages = yield Promise.all(galleries.map((gallery) => __awaiter(void 0, void 0, void 0, function* () {
            const columnsWithImages = yield Promise.all(gallery.columns.map((column) => __awaiter(void 0, void 0, void 0, function* () {
                const images = yield img_1.default.find({ _id: { $in: column } });
                return images;
            })));
            return Object.assign(Object.assign({}, gallery.toObject()), { columns: columnsWithImages });
        })));
        res.status(200).json(galleriesWithImages);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Update document - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedGalleryItem = req.body;
    imgGallery_1.default
        .findByIdAndUpdate(id, updatedGalleryItem, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send(data);
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete document - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    imgGallery_1.default
        .findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was deleted successfully!" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete all documents - DELETE
router.delete("/", validation_1.verifyToken, (req, res) => {
    imgGallery_1.default
        .deleteMany({})
        .then((result) => {
        res.send({
            message: `${result.deletedCount} documents were deleted successfully!`,
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Fetch specific galleries with images - GET
router.get("/specific-galleries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const galleryIds = req.query.ids ? req.query.ids.split(",") : [];
    try {
        const galleries = yield imgGallery_1.default.find({ _id: { $in: galleryIds } });
        const galleriesWithImages = yield Promise.all(galleries.map((gallery) => __awaiter(void 0, void 0, void 0, function* () {
            const columnsWithImages = yield Promise.all(gallery.columns.map((column) => __awaiter(void 0, void 0, void 0, function* () {
                const images = yield img_1.default.find({ _id: { $in: column } });
                return images;
            })));
            return Object.assign(Object.assign({}, gallery.toObject()), { columns: columnsWithImages });
        })));
        res.status(200).json(galleriesWithImages);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
