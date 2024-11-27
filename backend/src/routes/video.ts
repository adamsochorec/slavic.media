import { Router, Request, Response } from "express";
import VideoGallery from "../models/video";
import { verifyToken } from "../validation";

const router = Router();

// CRUD operations for video galleries

// Create video gallery - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  VideoGallery.create(data)
    .then((insertedData) => {
      res.status(201).send(insertedData);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all video galleries - GET
router.get("/", (req: Request, res: Response) => {
  VideoGallery.find()
    .then((data) => {
      // Sort videos within each gallery
      data.forEach((gallery: any) => {
        gallery.videos.sort((a: any, b: any) => a.index - b.index);
      });
      // Sort galleries
      data.sort((a, b) => a.index - b.index);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific video gallery by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  VideoGallery.findById(req.params.id)
    .then((data) => {
      if (data) {
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update video gallery - PUT
router.put("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGallery = req.body;

  VideoGallery.findByIdAndUpdate(id, updatedGallery, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update video gallery with id=${id}. Maybe gallery was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Delete video gallery - DELETE
router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;

  VideoGallery.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete video gallery with id=${id}. Maybe gallery was not found!`,
        });
      } else {
        res.send({ message: "Video gallery was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// CRUD operations for videos

// Add video to gallery - POST
router.post("/:galleryId", verifyToken, (req: Request, res: Response) => {
  const { galleryId } = req.params;
  const newVideo = req.body;

  VideoGallery.findByIdAndUpdate(
    galleryId,
    { $push: { videos: newVideo } },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add video to gallery. Maybe gallery was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific video in gallery - GET
router.get("/:galleryId/:videoId", (req: Request, res: Response) => {
  const { galleryId, videoId } = req.params;

  VideoGallery.findById(galleryId)
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find gallery with id=${galleryId}.`,
        });
      } else {
        const video = data.videos.id(videoId);
        if (!video) {
          res.status(404).send({
            message: `Cannot find video with id=${videoId} in gallery with id=${galleryId}.`,
          });
        } else {
          res.send(video);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific video in gallery - PUT
router.put(
  "/:galleryId/:videoId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, videoId } = req.params;
    const updatedVideo = req.body;

    VideoGallery.findOneAndUpdate(
      { _id: galleryId, "videos._id": videoId },
      { $set: { "videos.$": updatedVideo } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update video with id=${videoId} in gallery with id=${galleryId}. Maybe video was not found!`,
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

// Delete specific video in gallery - DELETE
router.delete(
  "/:galleryId/:videoId",
  verifyToken,
  (req: Request, res: Response) => {
    const { galleryId, videoId } = req.params;

    VideoGallery.findOneAndUpdate(
      { _id: galleryId },
      { $pull: { videos: { _id: videoId } } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete video with id=${videoId} in gallery with id=${galleryId}. Maybe video was not found!`,
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
