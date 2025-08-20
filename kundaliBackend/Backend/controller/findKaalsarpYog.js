// findKaalSarpData.js
const mongoose = require('mongoose');
// Import the utility function if you need it for any additional logic
// Import the Mongoose model for Kaal Sarp Yoga
const KaalSarpYog = require('../models/kaalsarpYoga');

// Connect to your MongoDB database (adjust connection string as needed)

/**
 * Finds a Kaal Sarp Yoga document by name.
 * @param {string} yogaName - The name of the Kaal Sarp Yoga to search for.
 */
const findKaalSarpDataByName = async (yogaName) => {
  try {
    const result = await KaalSarpYog.findOne({ name: yogaName });
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.error("Error fetching Kaal Sarp Yoga:", error);
  }
};

module.exports = {findKaalSarpDataByName}
