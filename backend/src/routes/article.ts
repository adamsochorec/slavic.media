import { Router, Request, Response } from "express";
import articleModel from "../models/article";
import { verifyToken } from "../validation";

const router = Router();

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  articleModel
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
  articleModel
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      {
        $unwind: "$authorDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          metadata: 1,
          content: 1,
          videos: 1,
          author: {
            _id: "$authorDetails._id",
            name: "$authorDetails.name",
            linkedin: "$authorDetails.linkedin",
          },
        },
      },
    ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Get the latest article by date - GET
router.get("/latest", (req: Request, res: Response) => {
  articleModel
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      {
        $unwind: "$authorDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          metadata: 1,
          author: {
            _id: "$authorDetails._id",
            name: "$authorDetails.name",
            linkedin: "$authorDetails.linkedin",
          },
        },
      },
      {
        $sort: { "metadata.date": -1 },
      },
      {
        $limit: 1,
      },
    ])
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({ message: "No articles found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Get the latest article by date - GET
router.get("/latest", (req: Request, res: Response) => {
  articleModel
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      {
        $unwind: "$authorDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          metadata: 1,
          content: 1,
          videos: 1,
          author: {
            _id: "$authorDetails._id",
            name: "$authorDetails.name",
            linkedin: "$authorDetails.linkedin",
          },
        },
      },
      {
        $sort: { "metadata.date": -1 },
      },
      {
        $limit: 1,
      },
    ])
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update document - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedArticle = req.body;

  articleModel
    .findByIdAndUpdate(id, updatedArticle, { new: true })
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
  articleModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete document with id=${id}. Maybe document was not found!`,
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
  articleModel
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
