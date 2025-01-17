const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
