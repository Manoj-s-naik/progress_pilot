
const ProjectModel = require("../models/projectModel"); // adjust path

const projectCreateHandler = async (req, res) => {
  try {
    const { name, description, status, startDate, endDate, assignedUsers, tasks } = req.body;
    // Optional: Validate name presence
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const newProject = new ProjectModel({
      name,
      description,
      status,
      startDate,
      endDate,
      assignedUsers,
      tasks,
    });

    await newProject.save();

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({
      status: "error",
      message: "Server error while creating project",
    });
  }
};


module.exports = {projectCreateHandler};