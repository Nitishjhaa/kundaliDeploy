const mongoose = require("mongoose");

const NakshatraSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "अश्विनी"
  number: { type: Number, required: true }, // e.g., 0
  nakshatradipati: { type: String, required: true }, // e.g., "केतु"
  nakshatradevata: { type: String, required: true }, // e.g., "अश्विनी कुमार"
  favorableNakshatra: { type: [String], default: [] }, // Array of favorable nakshatras
  unfavorableNakshatra: { type: [String], default: [] }, // Array of unfavorable nakshatras
  saririkSanrahna: {
    male: { type: String },
    female: { type: String },
  },
  charitr: {
    male: { type: String },
    female: { type: String },
  },
  education: {
    male: { type: String },
    female: { type: String },
  },
  marriedlife: {
    male: { type: String },
    female: { type: String },
  },
  Health: {
    male: { type: String },
    female: { type: String },
  },
  paaye: { type: String, required: true }, // e.g., "सोना"
  preferredJob: { type: String } 
});

const Nakshatra = mongoose.model("Nakshatra", NakshatraSchema);
module.exports = Nakshatra;
