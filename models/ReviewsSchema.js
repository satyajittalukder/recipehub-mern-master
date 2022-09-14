const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    userRating: { type: Number },
    userReview: { type: String },
    recipeID: { type: mongoose.Schema.Types.ObjectId, ref: "Recipes" },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = Reviews;
