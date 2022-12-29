const express = require("express")
const { getAllBlogs, searchQuery, getSingleBlog } = require("../controller/blog")
const Router = express.Router()

Router.get("/getAllBlogs", getAllBlogs)
Router.get("/searchByQuery", searchQuery)
Router.get("/singleBlog/:id", getSingleBlog)

module.exports = Router 