const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Define User Schema
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
