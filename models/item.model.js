// ─────────────────────────────────────────────────────────────────────────────
// models/item.model.js
//
// PURPOSE: Defines the Mongoose Schema and Model for a Lost/Found item.
//
// A "Schema" is a blueprint that tells Mongoose exactly what fields (columns)
// each document (row) in our MongoDB collection should have, along with their
// types and validation rules.
//
// A "Model" is a JavaScript class that Mongoose generates from the Schema.
// We use the Model to perform all database operations (Create, Read, Update,
// Delete) on the "items" collection in MongoDB.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

// ── Step 1: Define the Schema ────────────────────────────────────────────────
// Each key here becomes a field in our MongoDB document.
const itemSchema = new mongoose.Schema(
  {
    // The name/description of the lost or found item.
    // 'required: true' means MongoDB will reject a save if this field is missing.
    itemName: {
      type: String,
      required: [true, "Item name is required."],
      trim: true, // Removes accidental leading/trailing whitespace
    },

    // The category that best describes the item type.
    // 'enum' restricts the value to only these allowed strings.
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Electronics", "ID/Wallet", "Keys", "Books", "Other"],
    },

    // Where the item was found on campus (e.g., "Central Library").
    locationFound: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
    },

    // How to contact the person who found the item (phone/room number).
    contactInfo: {
      type: String,
      required: [true, "Contact info is required."],
      trim: true,
    },

    // Whether the item has been claimed yet.
    // Defaults to "Unclaimed" when a new item is created.
    status: {
      type: String,
      enum: ["Unclaimed", "Claimed"],
      default: "Unclaimed",
    },
  },
  {
    // ── Step 2: Enable Timestamps ─────────────────────────────────────────────
    // When 'timestamps: true', Mongoose automatically adds two fields:
    //   - 'createdAt': the date/time when the document was first saved.
    //   - 'updatedAt': the date/time when the document was last modified.
    timestamps: true,
  }
);

// ── Step 3: Create and Export the Model ─────────────────────────────────────
// 'mongoose.model("Item", itemSchema)' creates a Model named "Item".
// Mongoose automatically looks for (or creates) a MongoDB collection
// named "items" (lowercase + pluralised) to store these documents.
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
