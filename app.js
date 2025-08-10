// Load environment variables
require('dotenv').config();

// Core dependencies
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const flash = require('connect-flash');
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require('./generated/prisma');

// Authentication
const passport = require('./config/passport');


// Route imports
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const uploadFileRouter = require("./routes/uploadFile");
const createFolderRouter = require("./routes/createFolder");


// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session configuration with PostgreSQL store
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

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
app.use("/sign-up", signUpRouter);
app.use("/upload", uploadFileRouter);
app.use("/folder", createFolderRouter)

// Authentication routes
app.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: "Invalid Credentials",
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