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

// Add img to specific column in gallery - POST
router.post(
  "/:galleryId/:columnIndex",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex } = req.params;
    const newImg = req.body;

    galleryModel
      .findByIdAndUpdate(
        galleryId,
        { $push: { [`columns.${columnIndex}`]: newImg } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot add img to column ${columnIndex}. Maybe gallery or column was not found!`,
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

// Update specific img in column - PUT
router.put(
  "/:galleryId/:columnIndex/:imgId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex, imgId } = req.params;
    const updatedImg = req.body;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId, [`columns.${columnIndex}._id`]: imgId },
        { $set: { [`columns.${columnIndex}.$`]: updatedImg } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update img in column ${columnIndex} with id=${imgId}. Maybe img was not found!`,
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

// Delete specific img in column - DELETE
router.delete(
  "/:galleryId/:columnIndex/:imgId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex, imgId } = req.params;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId, [`columns.${columnIndex}._id`]: imgId },
        { $pull: { [`columns.${columnIndex}`]: { _id: imgId } } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete img in column ${columnIndex} with id=${imgId}. Maybe img was not found!`,
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
