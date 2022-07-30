const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  fetchUser,
  fetchAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/UserController");
const {
  loginUserValidator,
  registerUserValidator,
  editUserValidator,
} = require("../validators/UserValidators");
const validateToken = require("../middleware/validateToken");

router.get("/", (req, res) => {
  res.send("<h1>User Routes</h1>");
});

router.post("/login", loginUserValidator, loginUser);

router.post("/register", registerUserValidator, registerUser);

router
  .route("/:id")
  .get(validateToken, fetchUser)
  .delete(validateToken, deleteUser);

router.post("/edit", validateToken, editUserValidator, editUser);

module.exports = router;
