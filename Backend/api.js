const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const util = require("util");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const taskModel = require("./models/taskModel");

dotenv.config({ path: "./.env" });
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection URI
const dblink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xrrc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose
  .connect(dblink)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

const signupHandler = async (req, res) => {
  try {
    const { email, password, name, lastName, confirmPassword } = req.body;

    if (!email || !password || !name || !lastName || !confirmPassword) {
      return res.status(400).json({
        status: "failure",
        message:
          "Name, email, lastName, password, and confirmPassword are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failure",
        message: "Passwords do not match",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failure",
        message: "User already exists",
      });
    }

    // No need to manually hash password, `pre("save")` does it
    const newUser = await userModel.create({
      email,
      password,
      name,
      lastName,
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({
      status: "failure",
      message: "An error occurred during signup",
      error: err.message,
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid email or password",
      });
    }

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt", authToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "Lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Successfully generated JWT token",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: "failure",
      message: "An error occurred on our side",
      error: err.message,
    });
  }
};

const protectedRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access: Token missing",
        status: "failure",
      });
    }

    // Verify the token
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID to request object
    req.id = decryptedToken.id;

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const logoutHandler = async (req, res) => {
  try {
    res.clearCookie("jwt", { path: "/" });
    res.json({
      message: "logout successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal error",
      error: error.message,
    });
  }
};

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

    // Fetch all tasks for the logged-in user
    const loggedInUserTasks = await taskModel.find({ userId: loggedInUserId });

    if (loggedInUserTasks.length === 0) {
      // Check for empty array
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

const viewTaskWithId = async (req, res) => {
  //task._id : 6789223e6e30cc3837e7a2cf
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

const fetchCompletedStatusHandler = async (req, res) => {
  try {
    const loggedInUserId = req.id; // Get user ID from protectedRouteMiddleware

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    // Fetch only the pending tasks for the logged-in user
    const completedTasks = await taskModel.find({
      userId: loggedInUserId,
      status: "completed",
    });

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
    const loggedInUserId = req.id; // Get user ID from protectedRouteMiddleware

    if (!loggedInUserId) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    // Fetch only the pending tasks for the logged-in user
    const pendingTasks = await taskModel.find({
      userId: loggedInUserId,
      status: "pending",
    });

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
// Public routes

app.post("/api/auth/sign", signupHandler);
app.post("/api/auth/login", loginHandler);
app.post("/api/auth/logout", logoutHandler);

// Task routes
app.post("/api/task", protectedRouteMiddleware, createTaskHandler);
app.get(
  "/api/loggedInUsertasks",
  protectedRouteMiddleware,
  getLoggedinUserTasks
);
app.get(
  "/api/tasks/completed",
  protectedRouteMiddleware,
  fetchCompletedStatusHandler
);
app.get(
  "/api/tasks/pending",
  protectedRouteMiddleware,
  fetchPendingStatusHandler
);

app.get(
  "/api/auth/loggedinUser",
  protectedRouteMiddleware,
  loggedInUserInfoHandler
);
// Routes for checking purpose
app.put("/tasks/:id/status", updateStatusHandler);
app.get("/tasks/:id", viewTaskWithId);

// The routes that for Admin Panel
app.get("/api/tasks", viewAllTaskHandler);
app.delete("/tasks", deleteAllTaskHandler);

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error occurred: ${err.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
