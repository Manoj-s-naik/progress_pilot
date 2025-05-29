const express = require("express");
const {
  createTaskHandler,
  getLoggedinUserTasks,
  updateStatusHandler,
  fetchCompletedStatusHandler,
  fetchPendingStatusHandler,
  loggedInUserInfoHandler,
   PendingTaskCountHandler,
  CompletedTaskCountHandler,
    TaskCompletionPercentageHandler
} = require("../controllers/taskController");

const { protectedRouteMiddleware } = require("../middleware/authenticateMiddleware");

const router = express.Router();

router.post("/", protectedRouteMiddleware, createTaskHandler);
router.get("/completed", protectedRouteMiddleware, fetchCompletedStatusHandler);
router.get("/pending", protectedRouteMiddleware, fetchPendingStatusHandler);
router.get("/loggedInUsertasks", protectedRouteMiddleware, getLoggedinUserTasks);
router.get("/auth/loggedinUser", protectedRouteMiddleware, loggedInUserInfoHandler);
router.put("/:id/status", updateStatusHandler);
router.get("/completionPercentage",protectedRouteMiddleware,TaskCompletionPercentageHandler);
module.exports = router;
