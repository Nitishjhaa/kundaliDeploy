// models/DashaFal.js
const mongoose = require("mongoose");

const dashaFalSchema = new mongoose.Schema({
  mahadasha: { type: String, required: true },
  antardasha: { type: String, required: true },

  // Faladesh content
  fal: { type: String, required: true },
  remedy: { type: String },

  // Astrological flags
  isAshubh: { type: Boolean, default: false },
  inEnemyHouse: { type: Boolean, default: false },
  associatedEnemyPlanets: [{ type: String }],
  isInDusthana: { type: Boolean, default: false },

  // House distance: how far antardasha is from mahadasha (1–12)
  houseDifference: { type: Number }, // e.g., 1 = next house, 12 = previous

  // Optional actual house positions (useful if you want to recalculate)
  mahadashaHouse: { type: Number, min: 1, max: 12 },
  antardashaHouse: { type: Number, min: 1, max: 12 },
});

dashaFalSchema.index({ mahadasha: 1, antardasha: 1 }, { unique: true });

module.exports = mongoose.model("DashaFal", dashaFalSchema);

