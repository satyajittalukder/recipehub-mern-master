const express = require("express");
const router = express.Router();
const Ingredients = require("../models/IngredientsSchema");

//SHOW/READ
router.get("/", (req, res) => {
  Ingredients.find({}, (err, ingredients) => {
    if (err) {
      res
        .status(500)
        .send("Database error. Please contact your system administrator.");
    } else {
      res.status(200).send(ingredients);
    }
  });
});

//CREATE
router.post("/new", (req, res) => {
  Ingredients.create(req.body, (err, ingredient) => {
    if (err) {
      // res.send(err);
      if (err.code === 11000) {
        res.status(401).send({ ingredientName: "Ingredient already exists." });
      } else {
        return res
          .stats(500)
          .send("Database error. Please contact your system administrator.");
        // .status(401)
        // .send(err)
      }
    } else {
      res.status(200).send(ingredient);
    }
  });
});

//UPDATE
router.put("/update/:id", (req, res) => {
  Ingredients.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true, new: true },
    (err, ingredient) => {
      if (err) {
        if (err.code === 11000) {
          return res
            .status(401)
            .send({ ingredientName: "Ingredient already exists." });
        } else {
          return res.status(500).send("Database error");
        }
      } else {
        // console.log("Tag updated", ingredient);
        res.status(200).send(ingredient);
      }
    }
  );
});

//ARCHIVE (DELETE)
router.put("/archive/:id", (req, res) => {
  Ingredients.findByIdAndUpdate(
    req.params.id,
    { archived: true },
    (err, ingredient) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res
          .status(200)
          .send(ingredient.ingredientName, "Ingredient archived.");
      }
    }
  );
});

module.exports = router;
