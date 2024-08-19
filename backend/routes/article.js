// Import necessary modules
const router = require("express").Router(); // Express router to define the routes
const test = require("../models/article"); // document model to interact with the database
const { verifyToken } = require("../validation"); // Validation function to verify the token

// CRUD operations

// Create test - POST
router.post("/", verifyToken, (req, res) => {
  // Extract data from the request body
  const data = req.body;

  // Insert new test data into the database
  // If the insertion is successful, return the inserted data with a 201 status code
  // If there is an error, return the error message with a 500 status code
  test
    .insertMany(data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all documents - GET
router.get(
  "/",
  /* verifyToken,  */ (req, res) => {
    // Retrieve all documents from the database
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    test
      .find()
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
  /* verifyToken,  */ (req, res) => {
    // Retrieve a specific test by its ID
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    test
      .findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Update specific test by ID - PUT
router.put("/:id", verifyToken, (req, res) => {
  // Extract test ID from the request parameters
  const id = req.params.id;

  // Update the test with the provided ID using the request body data
  // If the update is successful, return a success message
  // If the test is not found, return a not found message with a 404 status code
  // If there is an error, return the error message with a 500 status code
  test
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update document with id=" +
            id +
            ". Maybe document was not found!",
        });
      } else {
        res.send({ message: "document was successfully updated." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating document with id=" + id });
    });
});

// Delete specific document by ID - DELETE
router.delete("/:id", verifyToken, (req, res) => {
  const id = req.params.id;

  // Delete the document with the provided ID
  // If the deletion is successful, return a success message
  // If the document is not found, return a not found message with a 404 status code
  // If there is an error, return the error message with a 500 status code
  test
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
      res.status(500).send({
        message: "Error deleting document with id=" + id,
        error: err,
      });
    });
});

// Function to map an array of documents to a new format
function mapArray(inputArray) {
  let outputArray = inputArray.map((element) => mapData(element));
  return outputArray;
}

// Function to map a single document to a new format
function mapData(element) {
  let outputObj = {
    id: element.id,
    title: element.title,
    content: element.content,
    thumbnail: element.thumbnail,
    author: element.author,
    date: element.date,
  };
  return outputObj;
}

// Export the router for use in other files
module.exports = router;
