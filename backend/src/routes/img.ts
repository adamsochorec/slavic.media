import { Router, Request, Response } from "express";
import galleryModel from "../models/img";
import { verifyToken } from "../validation";

const router = Router();

// CRUD operations for galleries

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
      data.sort((a, b) => a.index - b.index);
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

// Update gallery - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGallery = req.body;

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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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
    .catch((err) => {
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// CRUD operations for columns

// Add column to gallery - POST
router.post(
  "/:galleryId/columns",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId } = req.params;
    const newColumn = req.body;

    galleryModel
      .findByIdAndUpdate(
        galleryId,
        { $push: { columns: newColumn } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot add column to gallery with id=${galleryId}. Maybe gallery was not found!`,
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

// Update specific column in gallery - PUT
router.put(
  "/:galleryId/columns/:columnIndex",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex } = req.params;
    const updatedColumn = req.body;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId },
        { $set: { [`columns.${parseInt(columnIndex)}`]: updatedColumn } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update column ${columnIndex} in gallery with id=${galleryId}. Maybe column was not found!`,
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

// Delete specific column in gallery - DELETE
router.delete(
  "/:galleryId/columns/:columnIndex",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex } = req.params;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId },
        { $unset: { [`columns.${parseInt(columnIndex)}`]: 1 } },
        { new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete column ${columnIndex} in gallery with id=${galleryId}. Maybe column was not found!`,
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

// CRUD operations for images

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
        { $push: { [`columns.${parseInt(columnIndex)}`]: newImg } },
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

// Read specific img in column - GET
router.get("/:galleryId/:columnIndex/:imgId", (req: Request, res: Response) => {
  const { galleryId, columnIndex, imgId } = req.params;

  galleryModel
    .findById(galleryId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find gallery with id=${galleryId}.`,
        });
      } else {
        const column = data.columns[parseInt(columnIndex)];
        if (!column) {
          res.status(404).send({
            message: `Cannot find column ${columnIndex} in gallery with id=${galleryId}.`,
          });
        } else {
          const img = column.find((img) => img._id === imgId);
          if (!img) {
            res.status(404).send({
              message: `Cannot find img with id=${imgId} in column ${columnIndex}.`,
            });
          } else {
            res.send(img);
          }
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific img in column - PUT
router.put(
  "/:galleryId/:columnIndex/:imgId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, columnIndex, imgId } = req.params;
    const updatedImg = req.body;

    galleryModel
      .findOneAndUpdate(
        { _id: galleryId, [`columns.${parseInt(columnIndex)}._id`]: imgId },
        { $set: { [`columns.${parseInt(columnIndex)}.$`]: updatedImg } },
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
        { _id: galleryId, [`columns.${parseInt(columnIndex)}._id`]: imgId },
        { $pull: { [`columns.${parseInt(columnIndex)}`]: { _id: imgId } } },
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

// Read specific column by index - GET
router.get("/:galleryId/:columnIndex", (req: Request, res: Response) => {
  const { galleryId, columnIndex } = req.params;

  galleryModel
    .findById(galleryId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find gallery with id=${galleryId}.`,
        });
      } else {
        const column = data.columns[parseInt(columnIndex)];
        if (!column) {
          res.status(404).send({
            message: `Cannot find column ${columnIndex} in gallery with id=${galleryId}.`,
          });
        } else {
          res.send(column);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

export default router;
