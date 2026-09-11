const { Schema, model } = require("mongoose");

const pathSchema = new Schema(
  {
    user: {
     type: Schema.Types.ObjectId, ref: "User",
      required: true
    },
    city: {
      type: String,
      required: true
    },
    coordinates: {
        type: [[Number]], // several numbers in array
     required: true
    },
    distance: {
        type: Number,
         required: true
    },
    title: {
        type: Number,
         required: true
    }
  }
);

const Path = model("Path", pathSchema);

module.exports = Path;