const express = require("express");
const { createPost, getAllPosts, updateState, updatePost, deletePost } = require("../controller/ownerPosts");
const Router = express.Router();

Router.post("/createPost", createPost);
Router.get("/getPost", getAllPosts)
Router.patch("/updateState/:id",updateState)
Router.put("/editPost/:id",updatePost)
Router.delete("/deletePost/:id",deletePost)

module.exports = Router
