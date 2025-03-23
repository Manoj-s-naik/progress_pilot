const express = require("express");

const {
  viewAllTaskHandler,
  deleteAllTaskHandler,
  viewTaskWithId,
} = require("../controllers/adminContoller");

const router = express.Router();

router.get("/tasks", viewAllTaskHandler);
router.delete("/tasks", deleteAllTaskHandler);
router.get("/tasks/:id", viewTaskWithId);

module.exports = router;
