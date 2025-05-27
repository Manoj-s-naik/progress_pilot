const express = require("express");
const multer = require("multer");
const path = require("path");
const { protectedRouteMiddleware,} = require("../middleware/authenticateMiddleware");
const {viewAllTaskHandler,deleteAllTaskHandler,getAllEmployees,getAllEmployeesCount,getAllProjectCount,createTaskHandler} = require("../controllers/adminContoller");
const { projectCreateHandler } = require("../controllers/projectController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });



router.get("/tasks", protectedRouteMiddleware, viewAllTaskHandler);
router.get("/user", getAllEmployees);
router.get("/userCount", getAllEmployeesCount);
router.get("/projectCount", getAllProjectCount);
router.delete("/tasks", protectedRouteMiddleware, deleteAllTaskHandler);
router.post("/create",upload.single("resources"), createTaskHandler);
router.post("/creatProject", projectCreateHandler);

module.exports = router;
