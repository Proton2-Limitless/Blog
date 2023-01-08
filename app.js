const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRouter = require("./routes/user");
const ownerRouter = require("./routes/ownerPosts");
const blogRouter = require("./routes/blog");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const { errorPage,errorController } = require("./controller/errorhandler");
require("dotenv").config();

const app = express();
require("./authentication/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use(
  "/owner",
  passport.authenticate("jwt", { session: false }),
  ownerRouter
);
app.use("/blogs", blogRouter);

app.use(async (req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});
app.use(async (error, req, res, next) => {
  const errorCode = error.status || 500;
  const errorMessage = error.message || "Server errror";

  return res.status(errorCode).send(errorMessage);
});

module.exports = app;
