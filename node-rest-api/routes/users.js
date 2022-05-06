const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

// it is very important to remember your await statements

// UPDATE USER
router.put("/:id", async (req, res) => {
  // :id syntax is a request parameter (i.e. can take on any value)
  console.log("try update");
  console.log(req.body);
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $set: req.body, // sets all fields to be the one found in req.body
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    console.log(err);
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

// GET USER BY EITHER ID OR USERNAME USING QUERY PARAMETER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc; // _doc carries the entire document object in MongoDB. need to remove password and other extranneous information from the get response.
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
});


module.exports = router;
