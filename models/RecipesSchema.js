const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipesSchema = new Schema(
  {
    recipeName: { type: String },
    servingSize: { type: Number },
    prepTime: { type: Number },
    prepTimeUnit: { type: String },
    cookTime: { type: Number },
    cookTimeUnit: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    description: { type: String },
    imgURL: { type: String },
    ingredientList: [
      {
        quantity: { type: Number },
        units: { type: String },
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredients",
        },
      },
    ],
    instructions: { type: Array },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    avgRating: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Recipes = mongoose.model("Recipes", RecipesSchema);

module.exports = Recipes;
