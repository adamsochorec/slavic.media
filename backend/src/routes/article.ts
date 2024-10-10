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

// Read specific document by slug - GET
router.get("/:slug", (req: Request, res: Response) => {
  ArticleModel.findOne({ slug: req.params.slug })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific document by slug - PUT
router.put("/:slug", verifyToken, (req: Request, res: Response) => {
  const slug = req.params.slug;

  ArticleModel.findOneAndUpdate({ slug }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update document with slug=${slug}. Maybe document was not found!`,
        });
      } else {
        res.send({ message: "Document was successfully updated." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error updating document with slug=${slug}` });
    });
});

// Delete specific document by slug - DELETE
router.delete("/:slug", verifyToken, (req: Request, res: Response) => {
  const slug = req.params.slug;

  ArticleModel.findOneAndDelete({ slug })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete document with slug=${slug}. Maybe document was not found!`,
        });
      } else {
        res.send({ message: "Document was successfully deleted." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting document with slug=${slug}`,
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
      thumbnail: element.metadata.thumbnail,
      length: element.metadata.length,
    },
    content: {
      text: element.content.text,
      img: element.content.img,
    },
    title: element.title,
    slug: element.slug,
  };
}

export default router;
