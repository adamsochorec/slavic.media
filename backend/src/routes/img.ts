import { Router, Request, Response } from "express";
import imgModel from "../models/img";
import { verifyToken } from "../validation";

const router = Router();

// CRUD operations

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  imgModel
    .create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all documents - GET
router.get("/", (req: Request, res: Response) => {
  imgModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific document by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  imgModel
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Add image to specific column - POST
router.post("/:gallery/:column", verifyToken, (req: Request, res: Response) => {
  const { gallery, column } = req.params;
  const newImage = req.body;

  imgModel
    .findOneAndUpdate(
      { [`${gallery}.${column}`]: { $exists: true } },
      { $push: { [`${gallery}.${column}`]: newImage } },
      { new: true }
    )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add image to ${gallery}.${column}. Maybe gallery or column was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific image in column - PUT
router.put(
  "/:gallery/:column/:imageId",
  verifyToken,
  (req: Request, res: Response) => {
    const { gallery, column, imageId } = req.params;
    const updatedImage = req.body;

    imgModel
      .findOneAndUpdate(
        { [`${gallery}.${column}.id`]: imageId },
        { $set: { [`${gallery}.${column}.$`]: updatedImage } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update image in ${gallery}.${column} with id=${imageId}. Maybe image was not found!`,
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
  "/:gallery/:column/:imageId",
  verifyToken,
  (req: Request, res: Response) => {
    const { gallery, column, imageId } = req.params;

    imgModel
      .findOneAndUpdate(
        { [`${gallery}.${column}.id`]: imageId },
        { $pull: { [`${gallery}.${column}`]: { id: imageId } } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete image in ${gallery}.${column} with id=${imageId}. Maybe image was not found!`,
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
