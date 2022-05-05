const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// BEGIN PART 5
const router = express.Router();

// END PART 5

// BEGIN PART 8

// UPDATE USER
router.put("/:id", async (req, res) => {
 

  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).json("Account updated");
  } catch (err) {
    console.log(err);
  }
 
});

// GET USER BY ID OR USERNAME
router.get("/", async (req, res) => {
  try {
    const userID = req.query.userID;
    const username = req.query.username;
    const user = userID ? await User.findById(userID)
        : await User.findOne({username : username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
});

// GET FOLLOWING/FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const friends = await Promise.all(
        user.following.map((friendID) => {
          return User.findById(friendID);
        })
      );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      // Only unpack the properties we need, then push
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
  }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followed = await User.findByID(req.params.id);
      const follower = await User.findByID(req.body.userID);
      if (!followed.followers.includes(req.body.userID)) {
        await followed.updateOne({ $push: {followers: req.body.userID}});
        await follower.updateOne({ $push: {following: req.params.id}});
        res.status(200).json("Follow successful");
      } else {
        res.status(403).json("Already followed");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("Can't follow self");
  }
});

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followed = await User.findByID(req.params.id);
      const follower = await User.findByID(req.body.userID);
      if (followed.followers.includes(req.body.userID) && follower.following.includes(req.params.id)) {
        await followed.updateOne({ $pull: {followers: req.body.userID }});
        await follower.updateOne({ $pull: {following: req.params.id }});
        res.status(200).json("Unfollow successful");
      } else {
        res.status(403).json("Not followed");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("Can't unfollow self");
  }
});

// END PART 8

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

module.exports = router;
