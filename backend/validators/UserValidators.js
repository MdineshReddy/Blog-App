const yup = require("yup");

const loginUserValidator = (req, res, next) => {
  let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch((e) => {
      res.status(400).json({
        success: false,
        errors: e.errors,
      });
    });
};

const registerUserValidator = (req, res, next) => {
  let schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    avatar: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    dob: yup.date().required(),
    country: yup.string().required(),
    gender: yup.string().oneOf(["Female", "Male", "Other"]).required(),
    phone: yup.number(),
    description: yup.string(),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch((e) => {
      res.status(400).json({
        success: false,
        errors: e.errors,
      });
    });
};

const editUserValidator = (req, res, next) => {};

module.exports = {
  loginUserValidator,
  registerUserValidator,
  editUserValidator,
};
