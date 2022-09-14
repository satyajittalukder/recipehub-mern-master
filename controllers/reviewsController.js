const express = require("express");
const { isValidObjectId } = require("mongoose");
const Recipes = require("../models/RecipesSchema");
const router = express.Router();
const Reviews = require("../models/ReviewsSchema");
const ObjectId = require("mongoose").Types.ObjectId;

const isAuthenticated = (req, res, next) => {
  // console.log(req.session);
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).send("You are currently not logged in. Please log in.");
  }
};

const dbError = (res) => {
  return res
    .status(500)
    .send("Database error. Please contact your system administrator.");
};

//CREATE
router.post("/new", isAuthenticated, (req, res) => {
  let newRating = 0;
  const data = {
    ...req.body,
    userID: req.session.currentUser._id,
  };
  // console.log("add review", data);

  Reviews.create(data, (err, review) => {
    if (err) {
      return dbError(res);
    } else {
      Reviews.aggregate()
        .match({ recipeID: ObjectId(data.recipeID) })
        .group({ _id: "$recipeID", avgRating: { $avg: "$userRating" } })
        .exec((err, rating) => {
          // console.log("rating", rating);
          if (err) {
            return err;
          } else {
            // console.log(newRating);
            // console.log(rating);
            // console.log(review._id);
            newRating = rating[0].avgRating;
            // console.log(newRating, rating[0].avgRating);
            Recipes.findByIdAndUpdate(
              data.recipeID,
              {
                $set: { avgRating: newRating },
                $addToSet: { reviews: review._id },
              },
              { upsert: true, new: true },
              (err, recipe) => {
                if (err) {
                  // console.log("recipe review update fail", err);
                  res.status(500).send("Ratings update error");
                } else {
                  // console.log("recipe review update pass", recipe);
                  res.status(200).send({ review, newRating });
                }
              }
            );
            // console.log("end add review");
          }
        });
    }
  });
});

//UPDATE
router.put("/:reviewID", isAuthenticated, (req, res) => {
  let newRating = 0;
  const data = {
    ...req.body,
    userID: req.session.currentUser._id,
  };
  // console.log("update review", data);
  Reviews.findByIdAndUpdate(
    req.params.reviewID,
    data,
    { upsert: true, new: true },
    (err, review) => {
      if (err) {
        return dbError(res);
      } else {
        Reviews.aggregate()
          .match({ recipeID: ObjectId(data.recipeID) })
          .group({ _id: "$recipeID", avgRating: { $avg: "$userRating" } })
          .exec((err, rating) => {
            if (err) {
              return err;
            } else {
              // console.log(newRating);
              // console.log(rating);
              newRating = rating[0].avgRating;
              // console.log(newRating, rating[0].avgRating);
              Recipes.findByIdAndUpdate(
                data.recipeID,
                { avgRating: newRating },
                { upsert: true, new: true },
                (err, recipe) => {
                  if (err) {
                    return res.status(500).send("Ratings update error");
                  } else {
                    res.status(200).send({ review, newRating });
                  }
                }
              );
            }
          });
      }
    }
  );
});

//aggregate
// router.get("/avg", (req, res) => {
//   Reviews.aggregate()
//     .match({ recipeID: "601a30e86c7c7d21c2bdd1c3" })
//     .group({ _id: "$recipeID", rating: { $avg: "$userRating" } })
//     .exec((err, rating) => {
//       if (err) {
//         return err;
//       } else {
//         res.send(rating);
//       }
//     });
// });

module.exports = router;
