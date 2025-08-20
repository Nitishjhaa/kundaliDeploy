const mongoose = require("mongoose");

const LaganSchema = new mongoose.Schema({
  nameOfLagan: { type: String, required: true }, // e.g., "Aries,मेष"
  numberOfLagan: { type: Number, required: true }, // e.g., 1
  ashubh: { type: String, required: true }, // e.g., "शनि,बुध,शुक्र,गुरु"
  subh: { type: String, required: true }, // e.g., "गुरु,सूर्य"
  maarak: { type: String, }, // e.g., "शुक्र"
  raajyogKarak: { type: String, required: true }, // e.g., "सूर्य,गुरु,चंद्र"
  parampaapi: { type: String, }, // e.g., "बुध"
  ghaatak: { type: String, }, // e.g., "शनि"
  malik:{type: String,},
  description :{type: String}

});

const Lagan = mongoose.model("lagans", LaganSchema);
module.exports = Lagan;
