const {Router} = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.get("/" , signUpRouter.getSignUp);
signUpRouter.post("/" , signUpRouter.postSignUp);

module.exports = signUpRouter