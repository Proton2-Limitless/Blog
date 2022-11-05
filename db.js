const mongoose = require("mongoose")
require("dotenv").config()

function connectTodb(){
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on("connected",() => {
        console.log("connected to db succesfully")
    })

    mongoose.connection.on("error",() => {
        console.log("failed to connect to db")
    })
}

module.exports = { connectTodb }