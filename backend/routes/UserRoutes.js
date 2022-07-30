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
const validateToken = require("../middleware/validateUserToken");
const validateSiteToken = require("../middleware/validateSiteToken");

router.get("/", validateSiteToken, fetchAllUsers);

router.post("/login", loginUserValidator, loginUser);

router.post("/register", registerUserValidator, registerUser);

router
  .route("/:id")
  .get(validateSiteToken, fetchUser)
  .delete(validateToken, deleteUser)
  .patch(validateToken, editUserValidator, editUser);

module.exports = router;
