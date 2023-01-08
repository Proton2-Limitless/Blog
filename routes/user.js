const express = require('express');
const passport = require('passport');
const { Login, SignUp } = require('../controller/user');
const { SignUpUser, LogUser } = require('../validator/user.validate');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    SignUpUser,
    passport.authenticate('signup', { session: false }), 
    SignUp
);

authRouter.post(
    '/login',
    LogUser,
    Login
);

module.exports = authRouter;