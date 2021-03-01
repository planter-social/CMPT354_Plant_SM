// change this for production
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const initializeStrategy = require("./passport-config");
initializeStrategy(passport);

// Express session
app.use(
  session({
    secret: "SWqsVQjkcOocjZVVguJB",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser("SWqsVQjkcOocjZVVguJB"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//API routes
const router = require("./routes/router");
app.use("/api", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});