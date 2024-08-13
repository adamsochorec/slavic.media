// Import necessary modules
const router = require("express").Router(); // Express router to define the routes
const pizza = require("../models/pizza"); // Pizza model to interact with the database
const { verifyToken } = require("../validation"); // Validation function to verify the token

// CRUD operations

// Create pizza - POST
router.post(
  "/",
  /* verifyToken,  */ (req, res) => {
    // Extract data from the request body
    const data = req.body;

    // Insert new pizza data into the database
    // If the insertion is successful, return the inserted data with a 201 status code
    // If there is an error, return the error message with a 500 status code
    pizza
      .insertMany(data)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read all pizzas - GET
router.get(
  "/",
  /* verifyToken,  */ (req, res) => {
    // Retrieve all pizzas from the database
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    pizza
      .find()
      .then((data) => {
        res.send(mapArray(data));
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read specific pizza by ID - GET
router.get(
  "/:id",
  /* verifyToken,  */ (req, res) => {
    // Retrieve a specific pizza by its ID
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    pizza
      .findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Update specific pizza by ID - PUT
router.put(
  "/:id",
  /* verifyToken,  */ (req, res) => {
    // Extract pizza ID from the request parameters
    const id = req.params.id;

    // Update the pizza with the provided ID using the request body data
    // If the update is successful, return a success message
    // If the pizza is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    pizza
      .findByIdAndUpdate(id, req.body)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message:
              "Cannot update pizza with id=" +
              id +
              ". Maybe pizza was not found!",
          });
        } else {
          res.send({ message: "Pizza was successfully updated." });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updating pizza with id=" + id });
      });
  }
);

// Delete specific pizza by ID - DELETE
router.delete(
  "/:id",
  /* verifyToken,  */ (req, res) => {
    const id = req.params.id;

    // Delete the pizza with the provided ID
    // If the deletion is successful, return a success message
    // If the pizza is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    pizza
      .findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message:
              "Cannot delete pizza with id=" +
              id +
              ". Maybe pizza was not found!",
          });
        } else {
          res.send({ message: "Pizza was successfully deleted." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error deleting pizza with id=" + id,
          error: err,
        });
      });
  }
);

// Function to map an array of pizzas to a new format
function mapArray(inputArray) {
  let outputArray = inputArray.map((element) => mapData(element));
  return outputArray;
}

// Function to map a single pizza to a new format
function mapData(element) {
  let outputObj = {
    id: element.id,
    task: element.task,
    description: element.description,
    status: element.status,
    time: element.time,
  };
  return outputObj;
}

// Export the router for use in other files
module.exports = router;
