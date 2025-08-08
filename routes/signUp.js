const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");
const userValidator = require("../validators/userValidator");

signUpRouter.get("/", signUpController.getSignUpForm);
signUpRouter.post("/", userValidator, signUpController.postSignUpForm);

module.exports = signUpRouter;