import { Router, Request, Response } from "express";
import reviewModel from "../models/review";
import { verifyToken } from "../validation";

const router = Router();

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  reviewModel
    .create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all document - GET
router.get("/", (req: Request, res: Response) => {
  const fields =
    typeof req.query.fields === "string"
      ? req.query.fields.split(",").join(" ")
      : "";
  reviewModel
    .find({}, fields)
    .sort({ _id: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific document by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  const fields =
    typeof req.query.fields === "string"
      ? req.query.fields.split(",").join(" ")
      : "";
  reviewModel
    .findById(req.params.id, fields)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update document - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedReview = req.body;

  reviewModel
    .findByIdAndUpdate(id, updatedReview, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update document with id=${id}. Maybe document was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Delete document - DELETE
router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  reviewModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update document with id=${id}. Maybe document was not found!`,
        });
      } else {
        res.send({ message: "Document was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Delete all documents - DELETE
router.delete("/", verifyToken, (req: Request, res: Response) => {
  reviewModel
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

export default router;
