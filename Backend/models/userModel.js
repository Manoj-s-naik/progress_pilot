const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"], // Email validation
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    trim: true,
  },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();


  this.password = await bcrypt.hash(this.password, 10);
  
 
  this.confirmPassword = undefined;
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
