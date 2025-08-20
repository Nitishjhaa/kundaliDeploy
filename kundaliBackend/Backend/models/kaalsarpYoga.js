const mongoose = require("mongoose");

const kaalSarpYogSchema = new mongoose.Schema({
    positionOfRahuKetu: { type: String, required: true }, // e.g., '1-7'
    name: { type: String, required: true },              // e.g., 'Anant Kaal-Sarp Yoga'
    description: { type: String, required: true },       // Details about the yoga
    remedies: { type: String, required: false }          // Remedies for the condition, optional field
});

const kaalSarpYog = mongoose.model("KaalSarpYog", kaalSarpYogSchema);
module.exports = kaalSarpYog