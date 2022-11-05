const express = require('express');
const passport = require('passport');
const { Login, SignUp } = require('../controller/user');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), 
    SignUp
);

authRouter.post(
    '/login',
    Login
);

module.exports = authRouter;