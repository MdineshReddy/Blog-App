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

const fetchUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      throw new Error("No User found with that ID!");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (userExists) {
      if (id === req.user) {
        userExists.firstName = body.firstName || userExists.firstName;
        userExists.lastName = body.lastName || userExists.lastName;
        userExists.dob = body.dob || userExists.dob;
        userExists.country = body.country || userExists.country;
        userExists.gender = body.gender || userExists.gender;
        userExists.description = body.description || userExists.description;
        userExists.avatar = body.avatar || userExists.avatar;
        userExists.phone = body.phone || body.phone;

        await userExists.save();

        res.status(200).json({
          success: true,
          message: "User Updated Successfully",
        });
      } else {
        throw new Error("You can only Edit your Account!");
      }
    } else {
      throw new Error("User Does not Exist!");
    }
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await User.findById(id);
    if (userExists) {
      if (id === req.user) {
        await userExists.delete();
        res.status(200).json({
          success: true,
          message: "User Deleted Successfully",
        });
      } else {
        throw new Error("You can only delete your Account!");
      }
    } else {
      throw new Error("User Does not Exist!");
    }
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  fetchUser,
  fetchAllUsers,
  editUser,
  deleteUser,
};
