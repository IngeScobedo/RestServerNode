const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Base Conected!");
  } catch (error) {
    console.error(error);
    throw new Error("Error while connecting to MongoDB");
  }
};

module.exports = {
  dbConnection,
};
