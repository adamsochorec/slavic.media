// Import necessary modules
import { Router, Request, Response } from "express";
import ArticleModel from "../models/article"; // Document model to interact with the database
import { verifyToken } from "../validation"; // Validation function to verify the token

// Express router to define the routes
const router = Router();

// CRUD operations

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  // Extract data from the request body
  const data = req.body;

  // Insert new document data into the database
  // If the insertion is successful, return the inserted data with a 201 status code
  // If there is an error, return the error message with a 500 status code
  ArticleModel.insertMany(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all documents - GET
router.get(
  "/",
  /* verifyToken,  */ (req: Request, res: Response) => {
    // Retrieve all documents from the database
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    ArticleModel.find()
      .then((data) => {
        res.send(mapArray(data));
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read specific document by ID - GET
router.get(
  "/:id",
  /* verifyToken,  */ (req: Request, res: Response) => {
    // Retrieve a specific document by its ID
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    ArticleModel.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Update specific document by ID - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  // Extract document ID from the request parameters
  const id = req.params.id;

  // Update the document with the provided ID using the request body data
  // If the update is successful, return a success message
  // If the document is not found, return a not found message with a 404 status code
  // If there is an error, return the error message with a 500 status code
  ArticleModel.findByIdAndUpdate(id, req.body, { new: true })
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

  // Delete the document with the provided ID
  // If the deletion is successful, return a success message
  // If the document is not found, return a not found message with a 404 status code
  // If there is an error, return the error message with a 500 status code
  ArticleModel.findByIdAndDelete(id)
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
      res.status(500).send({
        message: "Error deleting document with id=" + id,
        error: err,
      });
    });
});

// Function to map an array of documents to a new format
function mapArray(inputArray: any[]): any[] {
  return inputArray.map((element) => mapData(element));
}

// Function to map a single document to a new format
function mapData(element: any): any {
  return {
    id: element._id,
    author: {
      thumbnail: element.author.thumbnail,
      name: element.author.name,
    },
    metadata: {
      date: element.metadata.date,
      keywords: element.metadata.keywords,
      thumbnail: element.metadata.thumbnail,
    },
    content: {
      text: element.content.text,
      img: element.content.img,
    },
    title: element.title,
  };
}
// Export the router for use in other files
export default router;
