import { Router, Request, Response } from "express";
import newsletterModel from "../models/newsletter";
import { verifyToken } from "../validation";
import moment from "moment-timezone";

const router = Router();

// Create document - POST
router.post("/", (req: Request, res: Response) => {
  const data = req.body;
  // Get current time in Europe/Prague and convert to UTC by subtracting the offset
  const cetMoment = moment.tz("Europe/Prague");
  data.date = new Date(
    Date.UTC(
      cetMoment.year(),
      cetMoment.month(),
      cetMoment.date(),
      cetMoment.hour(),
      cetMoment.minute(),
      cetMoment.second(),
      cetMoment.millisecond()
    )
  );
  newsletterModel
    .create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: "Email already subscribed." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
});

// Read all documents - GET
router.get("/", (req: Request, res: Response) => {
  const fields =
    typeof req.query.fields === "string"
      ? req.query.fields.split(",").join(" ")
      : "";
  newsletterModel
    .find({}, fields)
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
  newsletterModel
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
  const updatedNewsletter = req.body;

  newsletterModel
    .findByIdAndUpdate(id, updatedNewsletter, { new: true })
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
  newsletterModel
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
  newsletterModel
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
