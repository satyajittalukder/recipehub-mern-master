//handle all controller to /users -- to view user profile, edit etc
const express = require("express");
const router = express.Router();
const Users = require("../models/UsersSchema");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { find } = require("../models/UsersSchema");

// CREATE
router.post(
  "/new",
  [
    body("username").trim().notEmpty().withMessage("username cannot be empty"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync()
    );
    Users.create(req.body, (err, user) => {
      if (err) {
        if (err.code === 11000) {
          res.status(401).send({ username: "Username is taken." });
          // res.status(401).send(err);
        } else {
          console.log(err);
          return res
            .status(500)
            .send("Database error. Please contact your system administrator.");
        }
      } else {
        // console.log("User created.");
        res.status(200).send({ _id: user._id, username: user.username });
      }
    });
  }
);

const isAuthenticated = (req, res, next) => {
  // console.log(req.session.currentUser);
  if (req.session.currentUser) {
    if (req.body.newPassword) {
      Users.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) {
          console.log("Database error");
          return res
            .status(500)
            .send("Database error. Pls contact your system admin");
        } else if (
          bcrypt.compareSync(req.body.currentPassword, foundUser.password)
        ) {
          return next();
        } else {
          return res.status(401).send("auth Password incorrect.");
        }
      });
    } else {
      // console.log("got session but no newpassword");
      next();
    }
  } else {
    // console.log("no session");
    res.status(401).send("You are currently not logged in. Please log in");
  }
};

// SHOW
router.get("/", isAuthenticated, (req, res) => {
  const userID = req.session.currentUser._id;
  Users.findById(userID, "username favourites planner", (err, user) => {
    res.send(user);
  });
  // res.send("SHOW USERS");
});

// UPDATE
router.put("/", isAuthenticated, (req, res) => {
  // res.send("USERS UPDATE");
  const userID = req.session.currentUser._id;
  if (req.body.newPassword) {
    // console.log("hashing paswsord");
    req.body.password = bcrypt.hashSync(
      req.body.newPassword,
      bcrypt.genSaltSync()
    );
  }

  Users.findByIdAndUpdate(userID, req.body, { new: true }, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(401).send({ username: "Username already exists." });
      } else {
        return res.status(500).send("Database error");
      }
    } else {
      // console.log("User updated", user);
      res.status(200).send({
        _id: user._id,
        username: user.username,
        // admin: user.admin,
      });
    }
  });
});

// SHOW(Planner)
router.get("/planner", isAuthenticated, (req, res) => {
  const userID = req.session.currentUser._id;
  Users.findById(userID, "planner")
    .populate({
      path: "planner.recipeID",
      select: "recipeName servingSize ingredientList",
      populate: {
        path: "ingredientList.ingredient",
        select: "ingredientName type",
      },
    })
    // .project({ _id: 0 })
    .exec((err, user) => {
      res.send(user.planner);
    });
  // res.send("SHOW USERS");
});

// SHOW(Favourite)
router.get("/favourites", isAuthenticated, (req, res) => {
  const userID = req.session.currentUser._id;
  Users.findById(userID, "favourites")
    .populate({
      path: "favourites",
      select: "recipeName tags description avgRating imgURL",
      populate: { path: "tags", select: "tagName" },
    })
    // .project({ _id: 0 })
    .exec((err, user) => {
      res.send(user.favourites);
    });
  // res.send("SHOW USERS");
});

// DELETE
router.delete("/", isAuthenticated, (req, res) => {
  // res.send("USERS DELETE");
  Users.findByIdAndUpdate(
    req.session.currentUser._id,
    { archive: true },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).send("Database error");
      } else {
        console.log("User deleted", user);
        res.status(200).send(user);
      }
    }
  );
});

module.exports = router;
