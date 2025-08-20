const mongoose = require("mongoose");

async function connectToDB(URL) {
  try {
    const connection = await mongoose.connect(URL);
    console.log("Connected to DB successfully!");
    return connection;
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error;
  }
}

module.exports = connectToDB;