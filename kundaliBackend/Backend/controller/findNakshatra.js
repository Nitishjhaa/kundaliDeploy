const Nakshatra = require('../models/Nakshatra');

async function findNakshatraByNumber(moonNakIndex) {
  try {
    const nakshatra = await Nakshatra.findOne({ number: moonNakIndex });
    if (!nakshatra) {
      throw new Error(`No Nakshatra found with number ${moonNakIndex}`);
    }
    return nakshatra;
  } catch (error) {
    console.error("Error finding Nakshatra by number:", error);
    throw error;
  }
}

// Export the function
module.exports = {findNakshatraByNumber};
