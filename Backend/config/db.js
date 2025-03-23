const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    const dblink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xrrc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(dblink);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
