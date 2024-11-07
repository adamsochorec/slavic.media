import { Router, Request, Response } from "express";
import galleryModel from "../models/img";
import { verifyToken } from "../validation";

const router = Router();

// CRUD operations

// Create gallery - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  galleryModel
    .create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all galleries - GET
router.get("/", (req: Request, res: Response) => {
  galleryModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Add image to specific column in gallery - POST
router.post(
  "/:galleryId/:column",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, column } = req.params;
    const newImage = req.body;

    galleryModel
      .findByIdAndUpdate(
        galleryId,
        { $push: { [`columns.${column}`]: newImage } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot add image to ${column}. Maybe gallery or column was not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Update specific image in column - PUT
router.put(
  "/:galleryId/:column/:imageId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, column, imageId } = req.params;
    const updatedImage = req.body;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId, [`columns.${column}._id`]: imageId },
        { $set: { [`columns.${column}.$`]: updatedImage } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update image in ${column} with id=${imageId}. Maybe image was not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Delete specific image in column - DELETE
router.delete(
  "/:galleryId/:column/:imageId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, column, imageId } = req.params;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId, [`columns.${column}._id`]: imageId },
        { $pull: { [`columns.${column}`]: { _id: imageId } } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete image in ${column} with id=${imageId}. Maybe image was not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

export default router;
