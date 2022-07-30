const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const body = req.body;
  try {
    const userExists = await User.findOne({ email: body.email });
    if (!userExists) {
      throw new Error("No User exist with that email. Please Register!");
    } else {
      const passwordCorrect = await bcrypt.compare(
        body.password,
        userExists.password
      );
      if (!passwordCorrect) {
        throw new Error("Invalid Email / Password");
      }
      const token = JWT.sign(userExists._id.toString(), process.env.JWT_SECRET);
      res.status(201).json({
        success: true,
        message: "User logged in Successfully",
        token,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const registerUser = async (req, res) => {
  const body = req.body;
  try {
    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      throw new Error("User with that email already exists. Please Login!");
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 12);
      const user = new User({ ...body, password: hashedPassword });
      await user.save();
      const token = JWT.sign(user._id.toString(), process.env.JWT_SECRET);
      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        token,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const fetchUser = async (req, res) => {};

const fetchAllUsers = async (req, res) => {};

const editUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  loginUser,
  registerUser,
  fetchUser,
  fetchAllUsers,
  editUser,
  deleteUser,
};
