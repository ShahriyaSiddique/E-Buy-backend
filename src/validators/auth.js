const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name field required"),
  check("lastName").notEmpty().withMessage("Last Name field required"),
  check("email").notEmpty().withMessage("Email field required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password").notEmpty().withMessage("Password field required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

exports.validateSigninRequest = [
  check("email").notEmpty().withMessage("Email field required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password").notEmpty().withMessage("Password field required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
