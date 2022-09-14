const express = require("express");
const router = express.Router();
const Tags = require("../models/TagsSchema");
const { body, validationResult } = require("express-validator");

const dbError = (res) => {
  return res
    .status(500)
    .send("Database error. Please contact your system administrator.");
};

//SHOW/READ
router.get("/", (req, res) => {
  // console.log(req.query);
  //doctoring to remove limit
  const limit = {};
  if (req.query.limit) {
    limit.limit = parseInt(req.query.limit);
    delete req.query.limit;
  }
  // console.log(req.query, limit);
  Tags.find(req.query, "tagName tagCategory", limit, (err, tags) => {
    if (err) {
      return dbError(res);
    } else {
      res.status(200).send(tags);
    }
  });
});

//SHOW Categories
router.get("/categories", (req, res) => {
  Tags.distinct("tagCategory", (err, categories) => {
    if (err) {
      return dbError(res);
    } else {
      return res.status(200).send(categories);
    }
  });
});

//SHOW Categories
router.get("/group", (req, res) => {
  Tags.aggregate()
    .group({
      _id: "$tagCategory",
      // tagName: { $push: "$tagName" },
      tag: { $push: { tagName: "$tagName", tagID: "$_id" } },
    })
    // .project("tagCategory tagName")
    .exec((err, categories) => {
      if (err) {
        return dbError(res);
      } else {
        return res.status(200).send(categories);
      }
    });
});

//CREATE
router.post(
  "/new",
  [
    body("tagName")
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("tag name cannot be empty"),
    body("tagCategory")
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("category name cannot be empty"),
  ],
  (req, res) => {
    Tags.create(req.body, (err, tag) => {
      if (err) {
        // res.send(err);
        if (err.code === 11000) {
          res.status(401).send({ tagName: "Tag already exists." });
        } else {
          return dbError(res);
        }
      } else {
        res.status(200).send(tag);
      }
    });
  }
);

//UPDATE
router.put("/update/:id", (req, res) => {
  Tags.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, tag) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(401).send({ tagName: "Tag already exists." });
      } else {
        return dbError(res);
      }
    } else {
      // console.log("Tag updated", tag);
      res.status(200).send(tag);
    }
  });
});

//ARCHIVE (DELETE)
router.put("/archive/:id", (req, res) => {
  Tags.findByIdAndUpdate(req.params.id, { archived: true }, (err, tag) => {
    if (err) {
      return dbError(res);
    } else {
      return res.status(200).send(tag.tagName, "Tag archived.");
    }
  });
});

module.exports = router;
