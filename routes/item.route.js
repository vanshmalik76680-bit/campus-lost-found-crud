// ─────────────────────────────────────────────────────────────────────────────
// routes/item.route.js
//
// PURPOSE: Maps HTTP methods + URL paths to the appropriate controller functions.
//
// Think of a "Router" as a traffic director:
//   - A request arrives at a URL like POST /api/items
//   - The Router looks up which controller function should handle it
//   - It calls that function, passing along the request and response objects
//
// We use express.Router() to create a modular mini-router that gets
// "mounted" in index.js under the /api/items base path.
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");

// Create a new Router instance.
const router = express.Router();

// Import all 5 CRUD controller functions from our controller file.
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller");

// ── Route Definitions ─────────────────────────────────────────────────────────
//
// These routes are all relative to the base path '/api/items'
// (which is set when this router is mounted in index.js).
//
// Full URL pattern:  HTTP Verb  →  Full Path           →  Controller function
// ─────────────────────────────────────────────────────────────────────────────

// POST   /api/items        → Create a new item
router.post("/", createItem);

// GET    /api/items        → Fetch ALL items (newest first)
router.get("/", getAllItems);

// GET    /api/items/:id    → Fetch a SINGLE item by its MongoDB _id
router.get("/:id", getItemById);

// PUT    /api/items/:id    → Update an existing item by its MongoDB _id
router.put("/:id", updateItem);

// DELETE /api/items/:id    → Delete an item by its MongoDB _id
router.delete("/:id", deleteItem);

// Export the router so index.js can mount it.
module.exports = router;
