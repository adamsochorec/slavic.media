import { Router, Request, Response } from "express";
import galleryModel from "../models/imgGallery";
import imgModel from "../models/img";
import { verifyToken } from "../validation";

const router = Router();

// Create document - POST
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

// Read all documents - GET
router.get("/", (req: Request, res: Response) => {
  const fields =
    typeof req.query.fields === "string"
      ? req.query.fields.split(",").join(" ")
      : "";
  galleryModel
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
  galleryModel
    .findById(req.params.id, fields)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read galleries with images - GET
router.get("/with-images", async (req: Request, res: Response) => {
  try {
    const galleries = await galleryModel.find({});
    const galleriesWithImages = await Promise.all(
      galleries.map(async (gallery) => {
        const columnsWithImages = await Promise.all(
          gallery.columns.map(async (column) => {
            const images = await imgModel.find({ _id: { $in: column } });
            return images;
          })
        );
        return {
          ...gallery.toObject(),
          columns: columnsWithImages,
        };
      })
    );
    res.status(200).json(galleriesWithImages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Update document - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGalleryItem = req.body;

  galleryModel
    .findByIdAndUpdate(id, updatedGalleryItem, { new: true })
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
  galleryModel
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
  galleryModel
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

// Fetch specific galleries with images - GET
router.get("/specific-galleries", async (req: Request, res: Response) => {
  const galleryIds = req.query.ids ? (req.query.ids as string).split(",") : [];
  try {
    const galleries = await galleryModel.find({ _id: { $in: galleryIds } });
    const galleriesWithImages = await Promise.all(
      galleries.map(async (gallery) => {
        const columnsWithImages = await Promise.all(
          gallery.columns.map(async (column) => {
            const images = await imgModel.find({ _id: { $in: column } });
            return images;
          })
        );
        return {
          ...gallery.toObject(),
          columns: columnsWithImages,
        };
      })
    );
    res.status(200).json(galleriesWithImages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
