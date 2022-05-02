const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// BEGIN PART 5
const router = express.Router();

// END PART 5

// BEGIN PART 6

// REGISTRATION
router.post("/register", async (req, res) => {
  try {
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      description: req.body.description,
      city: req.body.city,
      from: req.body.from,
      relationship: req.body.relationship,
    });
    console.log(newUser);
    const user = await newUser.save();
    console.log("saved to DB");

    res.status(200).json(user);
    // SAVE NEW USER INTO MONGODB
  } catch (err) {
    console.log("got fucked up");
    console.log(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    console.log(req.body.password);
    console.log(user.password);
    const attemptPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // VALIDATE PASSWORD
    if (attemptPassword) {
      res.status(200).json(user);
    } else {
      res.status(400).json("login failed");
    }
  } catch (err) {
    console.log(err);
  }
});

// END PART 6

module.exports = router;
