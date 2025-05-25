const express = require("express");

const {
  protectedRouteMiddleware,
} = require("../middleware/authenticateMiddleware");
const {
  viewAllTaskHandler,
  deleteAllTaskHandler,
  getAllEmployees,
  getAllEmployeesCount,
  getAllProjectCount,
} = require("../controllers/adminContoller");
const { projectCreateHandler } = require("../controllers/projectController");

const router = express.Router();

router.get("/tasks", protectedRouteMiddleware, viewAllTaskHandler);
router.get("/user", getAllEmployees);
router.get("/userCount", getAllEmployeesCount);
router.get("/projectCount", getAllProjectCount);
router.delete("/tasks", protectedRouteMiddleware, deleteAllTaskHandler);
router.post("/creatProject", projectCreateHandler);

module.exports = router;
