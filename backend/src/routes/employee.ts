import { Router, Request, Response } from "express";
import employeeModel from "../models/employee";
import { verifyToken } from "../validation";

const router = Router();

// Create document - POST
router.post("/", verifyToken, (req: Request, res: Response) => {
  const data = req.body;
  employeeModel
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
  employeeModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific document by ID - GET
router.get("/:id", (req: Request, res: Response) => {
  employeeModel
    .findById(req.params.id)
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
  const updatedEmployee = req.body;

  employeeModel
    .findByIdAndUpdate(id, updatedEmployee, { new: true })
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
  employeeModel
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
export default router;
