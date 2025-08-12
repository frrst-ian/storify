const { body } = require("express-validator");

const fileValidator = [
    body("fileName")
        .trim()
        .notEmpty()
        .withMessage("File name is required")
        .isLength({ max: 50 })
        .withMessage("File name must be under 50 characters"),
]

module.exports = fileValidator;




