// ARTICLE.TS-1 CONTEXT
import { Router, Request, Response } from "express";
import ArticleModel from "../models/article";
import { verifyToken } from "../validation";

const router = Router();

// CRUD operations

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;

  ArticleModel.create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all documents - GET
router.get("/", (req: Request, res: Response) => {
  ArticleModel.find()
    .then((data) => {
      res.send(mapArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific document by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  ArticleModel.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific document by ID - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedArticle = req.body;

  ArticleModel.findByIdAndUpdate(id, updatedArticle, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update document with id=${id}. Maybe document was not found!`,
        });
      } else {
        res.send({ message: "Document was successfully updated." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error updating document with id=${id}` });
    });
});

// Delete specific document by ID - DELETE
router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const id = req.params;

  ArticleModel.findOneAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete document with id=${id}. Maybe document was not found!`,
        });
      } else {
        res.send({ message: "Document was successfully deleted." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting document with id=${id}`,
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
      url: element.author.url,
    },
    metadata: {
      date: element.metadata.date,
      keywords: element.metadata.keywords,
      linkedin: element.metadata.linkedin,
      thumbnail: element.metadata.thumbnail,
      length: element.metadata.length,
    },
    content: element.content,
    title: element.title,
  };
}

export default router;
