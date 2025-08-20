const Remedies = require("../models/remedies");
const mongoose = require("mongoose");

// Function to get remedy based on inauspicious planet and house
const getRemedy = async (grah, houseNumber) => {
  try {
    const remedy = await Remedies.findOne(
      { grah },
      { houses: { $elemMatch: { houseNumber } } }
    );

    if (remedy && remedy.houses.length > 0) {
      return remedy.houses[0]; // Return remedy for the given house
    }
    return { message: "No remedy found." };
  } catch (error) {
    console.error("Error fetching remedy:", error);
    return { error: "Internal Server Error" };
  }
};


module.exports = {getRemedy};
