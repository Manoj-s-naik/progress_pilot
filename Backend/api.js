const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const {
//   signupHandler,
//   loginHandler,
//   logoutHandler,
// } = require("./controllers/authController");
// const {
//   protectedRouteMiddleware,
// } = require("./middleware/authenticateMiddleware");
// const {
//   createTaskHandler,
//   getLoggedinUserTasks,
//   updateStatusHandler,
//   fetchCompletedStatusHandler,
//   fetchPendingStatusHandler,
//   loggedInUserInfoHandler,
// } = require("./controllers/taskController");

// const {
//   viewAllTaskHandler,
//   deleteAllTaskHandler,
//   viewTaskWithId,
// } = require("./controllers/adminContoller");

dotenv.config({ path: "./.env" });
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/admin", adminRoutes);

// Task routes
// app.post("/api/task", protectedRouteMiddleware, createTaskHandler);
// app.get(
//   "/api/loggedInUsertasks",
//   protectedRouteMiddleware,
//   getLoggedinUserTasks
// );
// app.get(
//   "/api/tasks/completed",
//   protectedRouteMiddleware,
//   fetchCompletedStatusHandler
// );
// app.get(
//   "/api/tasks/pending",
//   protectedRouteMiddleware,
//   fetchPendingStatusHandler
// );

// app.get(
//   "/api/auth/loggedinUser",
//   protectedRouteMiddleware,
//   loggedInUserInfoHandler
// );

// app.put("/tasks/:id/status", updateStatusHandler);


// The routes that for Admin Panel

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

startServer();
