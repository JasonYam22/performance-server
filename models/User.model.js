const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    goalWeight: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true
    },
    dailyCalorieGoal: {
      type: Number,
      default: 2000
    },
    weeklyWorkoutGoal: {
      type: Number,
      default: 0
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
