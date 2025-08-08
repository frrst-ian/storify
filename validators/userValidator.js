const { body } = require("express-validator");

const signUpValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .normalizeEmail()
        .isEmail()
        .withMessage("Must be a valid email")
        .isLength({ max: 50 })
        .withMessage("Email must be under 50 characters"),

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ max: 50 })
        .withMessage("Full name must be under 50 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Please confirm your password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password do not match");
            }
            return true;
        }),
]

module.exports = signUpValidator;