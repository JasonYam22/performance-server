const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
     type: Schema.Types.ObjectId, ref: User,
      required: true
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    distance: {
        type: Number,
     required: [true, 'Distance is required.'],
    },
    duration: {
        type: Number,
         required: [true, 'Duration is required.'],
    },
    caloriesBurned: {
        type: Number,
         required: true
    },
    date: {
        type: Date, default: Date.now
    }
  }

);

const User = model("User", userSchema);

module.exports = User;