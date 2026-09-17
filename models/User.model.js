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
       min: [0, "Weight can't be negative."],
    },
    height: {
      type: Number,
       min: [0, "Height can't be negative."],
    },
    goalWeight: {
      type: Number,
       min: [0, "Goal weight can't be negative."],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true
    },
    dailyCalorieGoal: {
      type: Number,
      default: null,
       min: [0, "Daily calorie goal can't be negative."],
    },
    weeklyWorkoutGoal: {
      type: Number,
      default: null,
       min: [0, "Weekly workout goal can't be negative."],
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
