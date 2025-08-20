const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ✅ One-time setup route (to insert user)
// router.post("/setup-user", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // check if user already exists
//     const existing = await User.findOne({ username });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({ username, password });
//     await user.save();

//     res.json({ message: "User created successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error creating user" });
//   }
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
