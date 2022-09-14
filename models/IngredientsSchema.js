const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema(
  {
    units: { type: Array },
    ingredientName: { type: String, unique: true },
    type: { type: String },
  },
  {
    timestamps: true,
    // strict: false,
  }
);

const Ingredients = mongoose.model("Ingredients", IngredientsSchema);

module.exports = Ingredients;
