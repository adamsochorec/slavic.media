import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import galleryModel from "../models/imgGallery";
import { verifyToken } from "../validation";

const router = Router();

// Helper function to convert string IDs to ObjectId
const convertToObjectId = (
  columns: string[][]
): mongoose.Types.ObjectId[][] => {
  if (!Array.isArray(columns)) {
    throw new TypeError("columns must be an array of arrays");
  }
  return columns.map((column) => {
    if (!Array.isArray(column)) {
      throw new TypeError("Each column must be an array");
    }
    return column.map((id) => new mongoose.Types.ObjectId(id));
  });
};

// Create gallery - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  try {
    console.log("Received data:", JSON.stringify(req.body, null, 2)); // Log the received data
    const data = req.body;
    if (!data.columns) {
      throw new Error("columns field is required");
    }
    data.columns = convertToObjectId(data.columns);

    galleryModel
      .create(data)
      .then((insertedData) => {
        res.status(201).send(insertedData);
      })
      .catch((err: any) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Read all galleries - GET
router.get("/", (req: Request, res: Response) => {
  const { type } = req.query; // Get the type from query parameters
  const filter = type ? { type } : {}; // Filter by type if provided

  galleryModel
    .find(filter)
    .then((data) => {
      data.sort((a, b) => a.index - b.index);
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific gallery by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  galleryModel
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
});

// Update gallery - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedGallery = req.body;
    if (!updatedGallery.columns) {
      throw new Error("columns field is required");
    }
    updatedGallery.columns = convertToObjectId(updatedGallery.columns);

    galleryModel
      .findByIdAndUpdate(id, updatedGallery, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update gallery with id=${id}. Maybe gallery was not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err: any) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Delete gallery - DELETE
router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;

  galleryModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete gallery with id=${id}. Maybe gallery was not found!`,
        });
      } else {
        res.send({ message: "Gallery was deleted successfully!" });
      }
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
});

// Delete all galleries - DELETE
router.delete("/", verifyToken, (req: Request, res: Response) => {
  galleryModel
    .deleteMany({})
    .then((result) => {
      res.send({
        message: `${result.deletedCount} galleries were deleted successfully!`,
      });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
});

export default router;
