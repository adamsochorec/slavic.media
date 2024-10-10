import { Router, Request, Response } from "express";
import imgModel from "../models/img"; // Document model to interact with the database
import { verifyToken } from "../validation"; // Validation function to verify the token

const router = Router();

// CRUD operations

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  imgModel
    .insertMany(data)
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
      res.send(mapArray(data));
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

// Read multiple documents by IDs - POST
router.post("/by-ids", (req: Request, res: Response) => {
  const ids = req.body.ids;
  imgModel
    .find({ _id: { $in: ids } })
    .then((data) => {
      res.send(mapArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific document by ID - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const id = req.params.id;
  imgModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update document with id=" +
            id +
            ". Maybe document was not found!",
        });
      } else {
        res.send({ message: "Document was successfully updated." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating document with id=" + id });
    });
});

// Delete specific document by ID - DELETE
router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const id = req.params.id;
  imgModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete document with id=" +
            id +
            ". Maybe document was not found!",
        });
      } else {
        res.send({ message: "Document was successfully deleted." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error deleting document with id=" + id, error: err });
    });
});

// Function to map an array of documents to a new format
function mapArray(inputArray: any[]): any[] {
  return inputArray.map((element) => mapData(element));
}

// Function to map a single document to a new format
function mapData(element: any): any {
  return {
    id: element._id, // Use _id for custom string ID
    largeURL: element.largeURL,
    thumbnailURL: element.thumbnailURL,
    width: element.width,
    height: element.height,
    flag: element.flag,
    title: element.title,
    alt: element.alt,
    client: element.client,
  };
}

export default router;
