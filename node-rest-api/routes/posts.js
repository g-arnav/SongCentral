const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  // this ^ is in reference to the postId
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
  // this ^ is in reference to the postId
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

// LIKE/UNLIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    // check if already liked by curr user and either like or unlike
    if (!post.likes.includes(req.body.userId) && !user.liked_posts.includes(req.params.id)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      await user.updateOne({ $push: { liked_posts: req.params.id } });
      console.log("Post liked");
      res.status(200).json("Post liked");
    } else if (post.likes.includes(req.body.userId) && user.liked_posts.includes(req.params.id)){
      await post.updateOne({ $pull: { likes: req.body.userId } });
      await user.updateOne({ $pull: { liked_posts: req.params.id } });
      res.status(200).json("Post unliked");
      console.log("Post unliked");
    }
  } catch (err) {
    console.log(err);
  }
});

// GENERATE FEED !!! THIS MUST COME BEFORE GET POST; EXPLAIN HOW ROUTE PRIORITY WORKS
router.get("/timeline/:userId", async (req, res) => {
  try {

    const allPosts = await Post.find();
    res.status(200).json(allPosts); // all posts together (user + friends)
  } catch (err) {
    console.log(err);
  }
});

router.get("/liked/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    // Post.find(match key value as param)
    // all friend posts
    const likedPosts = await Promise.all(
        currentUser.liked_posts.map((postID) => {
          return Post.find({ _id: postID });
        })
    );
    res.status(200).json(likedPosts); // all posts together (user + friends)
  } catch (err) {
    console.log(err);
  }
});

// GET ALL OF ONE USER'S POST

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
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

module.exports = router;
