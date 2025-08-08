const db = require("../db/queries")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await db.getUserByEmail(email);

            if (!user) {
                return done(null, false, { message: "Invalid credentials" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Invalid credentials" });
            }

            return done(null, user);
        } catch (err) {
            console.error('Authentication error:', err);
            return done(err);
        }
    })
);

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        done(null, user);
    } catch (err) {
        console.error('Deserialization error:', err);
        done(err);
    }
});

module.exports = passport;