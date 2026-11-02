// ─────────────────────────────────────────────────────────────────────────────
// index.js  (Application Entry Point)
//
// PURPOSE: This is the "heart" of our Express application. It:
//   1. Loads environment variables from .env
//   2. Initialises the Express app and registers middleware
//   3. Connects to MongoDB Atlas via Mongoose
//   4. Mounts our item router at the /api/items path
//   5. Serves the static HTML/CSS frontend from the /public folder
//   6. Starts listening on the configured port
// ─────────────────────────────────────────────────────────────────────────────

// ── Step 1: Load Environment Variables ───────────────────────────────────────
// dotenv reads the .env file and injects variables into process.env
// MUST be called before any other code that reads process.env values.
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Import our item router (which maps /api/items paths to controllers).
const itemRouter = require("./routes/item.route");

// ── Step 2: Create the Express App Instance ───────────────────────────────────
const app = express();

// ── Step 3: Register Middleware ───────────────────────────────────────────────
//
// Middleware are functions that run on EVERY incoming request before
// it reaches a route handler. Think of them as "pre-processing" layers.

// express.json() — parses incoming JSON request bodies.
// Without this, req.body would be 'undefined' for POST/PUT requests.
app.use(express.json());

// express.urlencoded() — parses URL-encoded form data (e.g., from HTML forms).
app.use(express.urlencoded({ extended: false }));

// express.static('public') — serves any file inside the 'public/' folder.
// When the browser visits http://localhost:3000, Express automatically
// looks for public/index.html and sends it.
app.use(express.static("public"));

// ── Step 4: Mount the API Router ──────────────────────────────────────────────
// Any request starting with '/api/items' is forwarded to our itemRouter.
// The router then matches the rest of the path (e.g., '/', '/:id') and
// calls the appropriate controller function.
app.use("/api/items", itemRouter);

// ── Step 5: Connect to MongoDB Atlas and Start the Server ────────────────────
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // MongoDB connected successfully — now it is safe to start the server.
    console.log("✅  Connected to MongoDB Atlas successfully.");

    app.listen(PORT, () => {
      console.log(`🚀  Server is running at http://localhost:${PORT}`);
      console.log(`📋  API Base URL: http://localhost:${PORT}/api/items`);
    });
  })
  .catch((error) => {
    // If the connection fails (wrong URI, network issue, etc.),
    // log the error and exit the process so we know something is wrong.
    console.error("❌  MongoDB connection failed:", error.message);
    process.exit(1);
  });
