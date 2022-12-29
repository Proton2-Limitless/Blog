const passport = require("passport")
require("dotenv").config()
const UserModel = require("../models/user")

const localStrategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt")

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token,done) => {
            try {
                return done(null,token.user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req,email,password,done) => {
            try {
                const firstname = req.body.firstname || "" 
                const lastname = req.body.lastname || "" 
                const user = await UserModel.create({email,password,firstname,lastname})
                return done(null,user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email,password,done) => {
            try {
                const user = await UserModel.findOne({email})
                if(!user){
                    return done(null,false,"User not found")
                }
                
                const validate = await user.ValidatePassword(password)
                if(!validate){
                    return done(null,false,"Passoword is not correct")
                }
                return done(null,user,"user logged in successfully")
            } catch (error) {
                done(error)
            }
        }
    )
)