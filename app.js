// Load environment variables
require('dotenv').config();

// Core dependencies
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const flash = require('connect-flash');

// Authentication
const passport = require('./config/passport');

// Database
const pool = require('./db/pool');

// Route imports
const indexRouter = require("./routes/index");

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session configuration with PostgreSQL store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pool,
    createTableIfMissing: true
  })
}));

// Passport middleware 
app.use(passport.session());

// Flash messages middleware
app.use(flash());

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Static files middleware
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Route handlers
app.use("/", indexRouter);

// Authentication routes
app.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: "Sample Error!"
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});