const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

// BEGIN PART 5
const router = express.Router();

// END PART 5

// BEGIN PART 7

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedpost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
  }
});

// LIKE/UNLIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userID)){
     await post.updateOne({ $push: { likes: req.body.userID }});
     res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userID }});
      res.status(200).json("Post unliked");
    }
  } catch (err) {
    console.log(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL OF ONE USER'S POST
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({userId: user._id});
  } catch (err) {
    console.log(err);
  }
});

// GET TIMELINE
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findbyID({username: req.params.userID});
    const userPosts = await Post.find({userID: user._id});
    const friendPosts = await Promise.all(
        user.following.map((friendID) => {
          return Post.find({userID: friendID});
        })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    console.log(err);
  }
});

// END PART 7

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // the Post and User models are a means by which to access the document collections
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("No permissions");
    }
  } catch (err) {
    console.log(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("No permissions");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
