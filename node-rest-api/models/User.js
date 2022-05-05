const mongoose = require("mongoose");

// BEGIN PART 4

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true
    },
    email: {
      type: String,
      max: 50,
      required: true,
      unique: true
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    ProfilePicture: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "",
    },
    
    genrePreference: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      max: 500,
    },
    city: {
      type: String,
      max: 50,
    },
    
  },
  { timestamps: true }
);

// END PART 4

module.exports = mongoose.model("User", UserSchema);
