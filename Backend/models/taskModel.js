const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending", "inprogress"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadLine: {
    type: Date,
    default: Date.now,
  },
  timeTaken: { type: String },
  updateIssue: { type: String },
  completedAt: { type: Date },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  projectName: {
    type: String,
    // required: true,
  },
  assignedBy: {
    type: String,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  priorityLevel: {
    type: String,
    enum: ["hard", "medium", "easy"],
    // required: true
  },
// resources: [
//   {
//     title: String,
//     description: String,
//     pdfUrl: {
//       type: String,
//       required: true,
//     },
//   },
// ],
resources: {
  type: String, 
  required: false,
}

});

taskSchema.pre("save", function (next) {
  if (this.status === "completed" && this.completedAt && this.createdAt) {
    const duration = this.completedAt - this.createdAt;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    this.timeTaken = `${hours} hours`;
  }
  next();
});

const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
