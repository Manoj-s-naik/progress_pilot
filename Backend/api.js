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
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        status: "failure",
        message: "Name, email, and password are required",
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
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
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

const logoutHandler = async (req,res) => {
  try {
    res.clearCookie("jwt", { path: "/" });
    res.json({
      message: "logout successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal error",
      error : error.message
    });
  }
};

app.post("/sign", signupHandler);
app.post("/login", loginHandler);
app.get("/profile", protectedRouteMiddleware, profileHandler);
app.post("/logout", logoutHandler);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
