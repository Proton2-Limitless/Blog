const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRouter = require("./routes/user");
const ownerRouter = require("./routes/ownerPosts");
const blogRouter = require("./routes/blog")
const { errorPage,errorController } = require("./controller/errorhandler");
require("dotenv").config();

const app = express();
require("./authentication/auth");

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use(
  "/owner",
  passport.authenticate("jwt", { session: false }),
  ownerRouter
);
app.use("/blogs",blogRouter)

app.use(errorPage);
app.use(errorController);

module.exports = app