const mongoose = require("mongoose");

// BEGIN PART 4

const PostSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },
    description: {
      type: String,
      max: 500,
      required: true
    },
    video: {
      type: String
    },
    likes: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

// END PART 4

module.exports = mongoose.model("Post", PostSchema);
