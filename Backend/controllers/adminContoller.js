const ProjectModel = require("../models/projectModel"); // adjust the path to your model
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

const viewAllTaskHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const allTask = await taskModel.findById(loggedInUserId);
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
    const loggedInUserId = req.id;

    const deleteAllTasks = await taskModel.deleteMany({
      userId: loggedInUserId,
    });

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

const getAllEmployees = async (req, res) => {
  try {
    const allEmployeesName = await userModel.find({role :"user"}).select("name");
    return res.status(201).json({
      user: allEmployeesName,
      message : "employe details fetched successfully",
      status : "success"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getAllEmployeesCount = async (req, res) => {
  try {
    const allEmployeesName = await userModel.countDocuments();
    return res.status(201).json({
      employeesCount: allEmployeesName,
      message : "employee counts fetched successfully",
      status : "success"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllProjectCount = async (req, res) => {
  try {
    const count = await ProjectModel.countDocuments();
    res.status(200).json({
      status: "success",
      count,
      message: "Total project count fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch project count",
      error: error.message
    });
  }
};

const createTaskHandler = async (req, res) => {
  try {
    const {
      taskName,
      projectName,
      priorityLevel,
      userId,
      deadLine,
      assignedBy,
      resources,
    } = req.body;

    const filePath = req.file ? req.file.path : null;

    const task = await taskModel.create({
      taskName,
      projectName,
      priorityLevel,
      userId,
      deadLine,
      assignedBy,
      resources: filePath,
    });
    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { viewAllTaskHandler, deleteAllTaskHandler, getAllEmployees, getAllEmployeesCount,getAllProjectCount,createTaskHandler};
