const express = require("express");
const {protectedRouteMiddleware} = require("../middleware/authenticateMiddleware");
const {viewAllTaskHandler,deleteAllTaskHandler} = require("../controllers/adminContoller");

const router = express.Router();

router.get("/tasks", protectedRouteMiddleware, viewAllTaskHandler);
router.delete("/tasks", protectedRouteMiddleware, deleteAllTaskHandler);

module.exports = router;
