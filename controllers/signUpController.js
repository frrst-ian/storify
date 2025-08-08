const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function getSignUpForm(req, res, next) {
    try {
        res.render("sign-up-form", {
            title: "Sign Up",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postSignUpForm(req, res, next) {
    const errors = validationResult(req);
    const { email, fullName, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
            errorList: errors.array(),
            email,
            fullName,
            title: "Sign Up",
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.createUser(email, fullName, hashedPassword);

        req.login(user, (err) => {
            if (err) return next(err);
            res.redirect("/");
        });

    } catch (error) {
        console.error("Signup error:", error);
        let errorMsg = "Something went wrong. Please try again.";

        if (error.code === "23505") {
            errorMsg = "A user with that email already exists.";
        }

        res.status(500).render("sign-up-form", {
            errorList: [{ msg: errorMsg }],
            email,
            fullName,
            title: "Sign Up",
        });
    }
}

module.exports = { getSignUpForm, postSignUpForm };