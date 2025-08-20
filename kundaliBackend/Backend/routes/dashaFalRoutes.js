// routes/dashaFalRoutes.js
const express = require("express");
const router = express.Router();
const { uploadDashaFal } = require("../controller/dashaFalController");

router.post("/dasha-fal", uploadDashaFal);

module.exports = router;
