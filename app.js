const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRouter = require("./routes/user");
const ownerRouter = require("./routes/ownerPosts");
const blogRouter = require("./routes/blog")
// const { errorPage,errorController } = require("./controller/errorhandler");
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

app.use(async (req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});
app.use(async (error,req,res,next) => {
  const errorCode = error.status || 500
  const errorMessage = error.message || "Server errror"

  return res.status(errorCode).send(errorMessage)
});

module.exports = app