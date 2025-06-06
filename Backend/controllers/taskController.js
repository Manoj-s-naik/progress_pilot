const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const createTaskHandler = async (req, res) => {
  try {
    const userId = req.id;
    const { taskName } = req.body;
    if (!taskName) {
      return res.status(400).json({
        message: "Task details or task name is required",
        status: "failure",
      });
    }

    const task = await taskModel.create({ taskName, userId });
    return res.status(201).json({
      message: "Task created successfully",
      status: "success",
      task: task,
      userid: userId,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getLoggedinUserTasks = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    const loggedInUserTasks = await taskModel.find({ userId: loggedInUserId });

    if (loggedInUserTasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found",
        status: "failure",
      });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      status: "success",
      tasks: loggedInUserTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      status: "failure",
      error: err.message,
    });
  }
};

const updateStatusHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID format" });
  }

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task status updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const fetchCompletedStatusHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    const completedTasks = await taskModel
      .find({
        userId: loggedInUserId,
        status: "completed",
      })
      .select(
        "projectName taskName timeTaken completedAt deadLine assignedBy assignedDate"
      );

    if (completedTasks.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    return res.status(200).json({
      message: "completed tasks fetched successfully",
      status: "success",
      tasks: completedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      status: "failure",
      error: error.message,
    });
  }
};

const fetchPendingStatusHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    const pendingTasks = await taskModel
      .find({
        userId: loggedInUserId,
        status: "pending",
      })
      .select("taskName projectName status deadLine assignedDate assignedBy"); // 👈 only selected fields

    if (pendingTasks.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    return res.status(200).json({
      message: "Pending tasks fetched successfully",
      status: "success",
      tasks: pendingTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      status: "failure",
      error: error.message,
    });
  }
};

const loggedInUserInfoHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    if (!loggedInUserId) {
      return res.status(400).json({
        message: "antentication require",
        status: "failure",
        error: error.message,
      });
    }

    const loggedInUser = await userModel.findById(loggedInUserId);
    return res.status(200).json({
      message: "User fetched successfully",
      status: "success",
      userInfo: {
        name: loggedInUser.name,
        email: loggedInUser.email,
        score: loggedInUser.score,
        lastName: loggedInUser.lastName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      status: "failure",
      error: error.message,
    });
  }
};

const PendingTaskCountHandler = async (req, res) => {
  try {
    const pendingTasksCount = await taskModel.countDocuments({
      status: "pending",
    });

    if (pendingTasksCount.length === 0) {
      return res.status(200).json({ tasks: [] });
    }

    return res.status(200).json({
      message: "Pending tasks count fetched successfully",
      status: "success",
      tasksCount: pendingTasksCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      status: "failure",
      error: error.message,
    });
  }
};

const CompletedTaskCountHandler = async (req, res) => {
  try {
    const completedTasksCount = await taskModel.countDocuments({
      status: "completed",
    });

    if (completedTasksCount === 0) {
      return res.status(200).json({ message: "no tasks found" });
    }
    return res.status(200).json({
      message: "completed tasks fetched successfully",
      status: "success",
      tasksCount: completedTasksCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      status: "failure",
      error: error.message,
    });
  }
};

const getLoggedinUserTasksCount = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    const loggedInUserTasksCount = await taskModel.countDocuments({
      userId: loggedInUserId,
    });

    if (loggedInUserTasksCount === 0) {
      return res.status(404).json({
        message: "No tasks found",
        status: "failure",
      });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      status: "success",
      totalTasks: loggedInUserTasksCount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      status: "failure",
      error: err.message,
    });
  }
};

const TaskCompletionPercentageHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    const totalTasks = await taskModel.countDocuments({
      userId: loggedInUserId,
    });
    const completedTasks = await taskModel.countDocuments({
      userId: loggedInUserId,
      status: "completed",
    });

    const completionPercentage =
      totalTasks === 0
        ? 0
        : Math.min(Math.round((completedTasks / totalTasks) * 100), 100);

    return res.status(200).json({
      message: "Task completion percentage fetched successfully",
      status: "success",
      percentage: completionPercentage,
      totalTasks,
      completedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failure",
      error: error.message,
    });
  }
};

module.exports = {
  createTaskHandler,
  getLoggedinUserTasks,
  updateStatusHandler,
  fetchCompletedStatusHandler,
  fetchPendingStatusHandler,
  loggedInUserInfoHandler,
  getLoggedinUserTasksCount,
  PendingTaskCountHandler,
  CompletedTaskCountHandler,
  TaskCompletionPercentageHandler,
};
