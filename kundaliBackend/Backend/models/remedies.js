const mongoose = require("mongoose");

const RemediesSchema = new mongoose.Schema({
  grah: {
    type: String,
    required: true,
    unique: true,
    enum: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"],
  },
  houses: [
    {
      houseNumber: { type: Number, required: true, min: 1, max: 12 },
      remedies: { type: String, required: true },
    },
  ],
});

const Remedies = mongoose.model("Remedies", RemediesSchema);

module.exports = Remedies;
