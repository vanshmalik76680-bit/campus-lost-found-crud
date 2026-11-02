// ─────────────────────────────────────────────────────────────────────────────
// controllers/item.controller.js
//
// PURPOSE: Contains all the "business logic" for each CRUD operation.
//
// A "Controller" is a function that:
//   1. Receives the HTTP request (req) sent by the browser/frontend.
//   2. Talks to the Database (via our Mongoose Model).
//   3. Sends back an HTTP response (res) with data or a status message.
//
// We export each function so the Router (item.route.js) can attach them to
// specific URL paths and HTTP methods (GET, POST, PUT, DELETE).
// ─────────────────────────────────────────────────────────────────────────────

// Import the Mongoose Model so we can perform database operations.
const Item = require("../models/item.model");

// ── 1. CREATE — POST /api/items ───────────────────────────────────────────────
// Creates a new lost/found item record in MongoDB.
// The data arrives in 'req.body' (parsed from the JSON body of the request).
const createItem = async (req, res) => {
  try {
    // Create a new Item document from the request body data.
    // Mongoose will validate the fields against our Schema automatically.
    const newItem = await Item.create(req.body);

    // HTTP 201 = "Created". Return the newly created document as JSON.
    res.status(201).json(newItem);
  } catch (error) {
    // If validation fails (e.g., a required field is missing), send a 400 error.
    // HTTP 400 = "Bad Request" (the client sent invalid data).
    res.status(400).json({
      message: "Failed to create item. Please check all required fields.",
      error: error.message,
    });
  }
};

// ── 2. READ ALL — GET /api/items ──────────────────────────────────────────────
// Fetches all items from MongoDB, sorted by newest first.
const getAllItems = async (req, res) => {
  try {
    // .find({}) selects ALL documents in the "items" collection.
    // .sort({ createdAt: -1 }) orders them newest → oldest (-1 = descending).
    const items = await Item.find({}).sort({ createdAt: -1 });

    // HTTP 200 = "OK". Return the array of items as JSON.
    res.status(200).json(items);
  } catch (error) {
    // HTTP 500 = "Internal Server Error" (something went wrong on our server).
    res.status(500).json({
      message: "Failed to fetch items.",
      error: error.message,
    });
  }
};

// ── 3. READ ONE — GET /api/items/:id ─────────────────────────────────────────
// Fetches a single item by its unique MongoDB _id.
// ':id' in the route is a URL parameter — it's accessible via req.params.id.
const getItemById = async (req, res) => {
  try {
    // req.params.id contains the MongoDB _id string from the URL.
    const item = await Item.findById(req.params.id);

    // If no item was found with that id, return a 404 error.
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // HTTP 200 = "OK". Return the single item as JSON.
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch item.",
      error: error.message,
    });
  }
};

// ── 4. UPDATE — PUT /api/items/:id ───────────────────────────────────────────
// Updates an existing item by its _id.
// Commonly used to toggle status from "Unclaimed" → "Claimed" (or vice versa).
const updateItem = async (req, res) => {
  try {
    // findByIdAndUpdate() arguments:
    //   1. The id to search for.
    //   2. The fields to update (from req.body).
    //   3. Options:
    //      - { new: true }         → Return the UPDATED document, not the original.
    //      - { runValidators: true }→ Run Schema validations on the updated fields.
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    // HTTP 200 = "OK". Return the updated document.
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item.",
      error: error.message,
    });
  }
};

// ── 5. DELETE — DELETE /api/items/:id ────────────────────────────────────────
// Permanently deletes an item from MongoDB by its _id.
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    // HTTP 200 = "OK". Send a confirmation message.
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete item.",
      error: error.message,
    });
  }
};

// ── Export all controller functions ──────────────────────────────────────────
// These are imported by item.route.js and attached to specific routes.
module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
