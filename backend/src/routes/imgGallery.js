"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var imgGallery_1 = require("../models/imgGallery");
var img_1 = require("../models/img");
var validation_1 = require("../validation");
var router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, function (req, res) {
    var data = req.body;
    imgGallery_1.default
        .create(data)
        .then(function (insertedData) {
        res.status(201).send(insertedData);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", function (req, res) {
    var fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    imgGallery_1.default
        .find({}, fields)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", function (req, res) {
    var fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    imgGallery_1.default
        .findById(req.params.id, fields)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read galleries with images - GET
router.get("/with-images", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var galleries, galleriesWithImages, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, imgGallery_1.default.find({})];
            case 1:
                galleries = _a.sent();
                return [4 /*yield*/, Promise.all(galleries.map(function (gallery) { return __awaiter(void 0, void 0, void 0, function () {
                        var columnsWithImages;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(gallery.columns.map(function (column) { return __awaiter(void 0, void 0, void 0, function () {
                                        var images;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, img_1.default.find({ _id: { $in: column } })];
                                                case 1:
                                                    images = _a.sent();
                                                    return [2 /*return*/, images];
                                            }
                                        });
                                    }); }))];
                                case 1:
                                    columnsWithImages = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, gallery.toObject()), { columns: columnsWithImages })];
                            }
                        });
                    }); }))];
            case 2:
                galleriesWithImages = _a.sent();
                res.status(200).json(galleriesWithImages);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json({ message: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Update document - PUT
router.put("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    var updatedGalleryItem = req.body;
    imgGallery_1.default
        .findByIdAndUpdate(id, updatedGalleryItem, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update document with id=".concat(id, ". Maybe document was not found!"),
            });
        }
        else {
            res.send(data);
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete document - DELETE
router.delete("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    imgGallery_1.default
        .findByIdAndDelete(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete document with id=".concat(id, ". Maybe document was not found!"),
            });
        }
        else {
            res.send({ message: "Document was deleted successfully!" });
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete all documents - DELETE
router.delete("/", validation_1.verifyToken, function (req, res) {
    imgGallery_1.default
        .deleteMany({})
        .then(function (result) {
        res.send({
            message: "".concat(result.deletedCount, " documents were deleted successfully!"),
        });
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Fetch specific galleries with images - GET
router.get("/specific-galleries", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var galleryIds, galleries, galleriesWithImages, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                galleryIds = req.query.ids ? req.query.ids.split(",") : [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, imgGallery_1.default.find({ _id: { $in: galleryIds } })];
            case 2:
                galleries = _a.sent();
                return [4 /*yield*/, Promise.all(galleries.map(function (gallery) { return __awaiter(void 0, void 0, void 0, function () {
                        var columnsWithImages;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(gallery.columns.map(function (column) { return __awaiter(void 0, void 0, void 0, function () {
                                        var images;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, img_1.default.find({ _id: { $in: column } })];
                                                case 1:
                                                    images = _a.sent();
                                                    return [2 /*return*/, images];
                                            }
                                        });
                                    }); }))];
                                case 1:
                                    columnsWithImages = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, gallery.toObject()), { columns: columnsWithImages })];
                            }
                        });
                    }); }))];
            case 3:
                galleriesWithImages = _a.sent();
                res.status(200).json(galleriesWithImages);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                res.status(500).json({ message: err_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
