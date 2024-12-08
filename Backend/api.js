const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" }); 
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// MongoDB Connection URI
const dblink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xrrc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose
  .connect(dblink)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

  app.get("/api/test", (req, res) => {
    res.json({ message: "Hello, world!" });
  });

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
