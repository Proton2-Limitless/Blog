const express = require("express");
const {
  createPost,
  getAllPosts,
  updateState,
  updatePost,
  deletePost,
} = require("../controller/ownerPosts");
const {
  asyncCreatePost,
  asyncUpdateState,
  asyncUpdatePost,
} = require("../validator/blog.validate");
const Router = express.Router();

Router.post("/createPost", asyncCreatePost, createPost);
Router.get("/getPost", getAllPosts);
Router.patch("/updateState/:id", asyncUpdateState, updateState);
Router.put("/editPost/:id", asyncUpdatePost, updatePost);
Router.delete("/deletePost/:id", deletePost);

module.exports = Router;
