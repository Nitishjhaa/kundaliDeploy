const express = require("express");
const router = express.Router();
const { getRemedy } = require("../utils/findRemidies");

// POST /api/remedy
router.post("/remedy", async (req, res) => {
  const { grah, houseNumber } = req.body;

  if (!grah || houseNumber == null) {
    return res.status(400).json({ error: "grah and houseNumber are required." });
  }

  try {
    const result = await getRemedy(grah, houseNumber);
    res.json(result);
  } catch (error) {
    console.error("Error in /remedy route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
