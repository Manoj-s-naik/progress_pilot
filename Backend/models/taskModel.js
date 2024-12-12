const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ["completed", "pending"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskModel = mongoose.model("user", taskSchema);
module.exports = taskModel;
