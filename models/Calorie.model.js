const { Schema, model } = require("mongoose");

const calorieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealName: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
/*     required: true, */
  },
  carbs: {
 type: Number,
    required: true,
  },
  fat : {
     type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
/* time: {
    timestamps: true
} */
});

const Calorie = model("Calorie", calorieSchema);

module.exports = Calorie;
