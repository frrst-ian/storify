const { body } = require("express-validator");

const folderValidator = [
    body("folderName")
        .trim()
        .notEmpty()
        .withMessage("Folder name is required")
        .isLength({ max: 50 })
        .withMessage("Folder name must be under 50 characters"),
]

module.exports = folderValidator;