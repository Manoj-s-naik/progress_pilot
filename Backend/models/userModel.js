const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is not correct or it is required"],
    unique: [true, "email should be unique"],
  },
  password: {
    type: String,
    required: [true, "password required with length 6"],
    minlength: 6,
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  score: {
    type: Number,
    default: 100,
  },
  about: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
