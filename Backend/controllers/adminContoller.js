const taskModel = require("../models/taskModel");
const viewAllTaskHandler = async (req, res) => {
  try {
    const allTask = await taskModel.find();
    return res.status(200).json({
      allTask: allTask,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteAllTaskHandler = async (req, res) => {
  try {
    const deleteAllTasks = await taskModel.deleteMany();
    return res.status(200).json({
      message: "all tasks deleted successfully",
      status: "success",
      "deleted tasks": deleteAllTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const viewTaskWithId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID format",
      });
    }

    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.status(200).json({
      task: task,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { viewAllTaskHandler, deleteAllTaskHandler, viewTaskWithId };
