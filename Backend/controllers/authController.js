const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

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

module.exports = { signupHandler, loginHandler, logoutHandler };
