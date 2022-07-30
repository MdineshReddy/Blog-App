const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is a required Field"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is a required Field"],
    },
    fullName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is a required Field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required Field"],
    },
    dob: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: [true, "Country is a required Field"],
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other"],
      required: [true, "Gender is a required Field"],
    },
    phone: {
      type: Number,
    },
    description: {
      type: String,
      max: [100, "Description must be below 100 characters!"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.fullName = this.firstName + " " + this.lastName;
  next();
});

module.exports = mongoose.model("User", UserSchema);
