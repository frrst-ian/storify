const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.get("/", signUpController.getSignUpForm);
signUpRouter.post("/", signUpController.postSignUpForm);

module.exports = signUpRouter