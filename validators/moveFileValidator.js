const { body } = require("express-validator");

const moveFileValidator = [
    body("selectedFolder")
        .trim()
]

module.exports = moveFileValidator;