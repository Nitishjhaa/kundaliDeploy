// controllers/dashaFalController.js
const DashaFal = require("../models/DashaFal");

exports.uploadDashaFal = async (req, res) => {
  try {
    const { mahadasha, antardasha, fal, remedy } = req.body;

    // upsert (create or update if exists)
    const result = await DashaFal.findOneAndUpdate(
      { mahadasha, antardasha },
      { fal, remedy },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Dasha fal saved", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
