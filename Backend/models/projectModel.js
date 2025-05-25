const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Assuming 'User' model
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const ProjectModel = mongoose.model("Project", projectSchema);
module.exports = ProjectModel;
