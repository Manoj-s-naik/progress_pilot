const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const util = require("util");
const promisify = util.promisify;
const jwt = require("jsonwebtoken");
const promisdiedJWTsign = promisify(jwt.sign);
const promisdiedJWTverify = promisify(jwt.verify);
const userModel = require("./models/userModel");
const taskModel = require("./models/taskModel");

dotenv.config({ path: "./.env" });
const app = express();

// Middleware
app.use(cors());
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
    const { email, password, name, lastName } = req.body;

    if (!email || !password || !name || !lastName) {
      return res.status(400).json({
        status: "failure",
        message: "Name, email,lastName and password are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failure",
        message: "User already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      name,
      confirmPassword: hashedPassword,
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
        message: "email and password required",
        status: "failure",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "invalid  email  ",
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
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "success fully generate the jwt token",
      status: "success",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "error on our side",
      error: err.message,
    });
  }
};

const protectedRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({
        message: "token is not there unauthorize access",
        status: "failure",
      });
    }
    // varify the token after call the next
    const dycryptedToken = await promisdiedJWTverify(
      token,
      process.env.JWT_SECRET_KEY
    );
    // token identifier
    req.id = dycryptedToken.id;

    next();
  } catch (err) {
    return res.status(500).json({
      message: "internal error",
      error: err,
    });
  }
};

const profileHandler = async (req, res) => {
  try {
    const userId = req.id;
    const user = await userModel.findById(userId);
    if (!userId) {
      return res.status(400).json({
        message: "there is no profile is there for this id",
        status: "success",
      });
    }
    return res.status(200).json({
      message: "profile found",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal error",
      error: err,
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
    const taskDetails = req.body;
    if (!taskDetails || !taskDetails.taskName) {
      return res.status(400).json({
        message: "Task details or task name is required",
        status: "failure",
      });
    }

    const task = await taskModel.create(taskDetails);
    return res.status(201).json({
      message: "Task created successfully",
      status: "success",
      task: task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
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
    const completedTask = await taskModel.find({ status: "completed" });

    return res.status(201).json({
      message: "completed tasks",
      status: "success",
      tasks: completedTask,
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

app.post("/sign", signupHandler);
app.post("/login", loginHandler);
app.get("/profile", protectedRouteMiddleware, profileHandler);
app.post("/logout", logoutHandler);

// Task routes
app.post("/task", createTaskHandler);
app.get("/tasks", viewAllTaskHandler);
app.delete("/tasks", deleteAllTaskHandler);
app.put("/tasks/:id/status", updateStatusHandler);
app.get("/tasks/completed", fetchCompletedStatusHandler);
app.get("/tasks/:id", viewTaskWithId);

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error occurred: ${err.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
