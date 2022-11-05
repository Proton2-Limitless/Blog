const PostModel = require("../models/post");
const userModel = require("../models/user");
const { CalculateReadingTime } = require("../utilis/utilis");

const createPost = async (req, res, next) => {
  try {
    const { title, description, tags, body } = req.body;
    const author = req.user._id;

    const reading_time = await CalculateReadingTime(body);

    let post = await PostModel.create({
      title,
      description,
      tags,
      body,
      author,
      reading_time,
    });

    post = await post.populate("author","firstname lastname")
    await post.save()
    const user = await userModel.findById(author);
    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({
      message: "Post created succesfully",
      status: true,
    });
  } catch (error) {
    error.status = 404;
    error.message = error.message || "not accepted";
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { state, page = 1 } = req.query;

    const limit = 20
    const id = req.user._id
    const PostByState = await PostModel.find({ author: id, state }).populate("author", "firstname lastname")
      .limit(limit * 1) 
      .skip((parseInt(page) - 1) * limit);

    const post = PostByState
    // console.log(PostByState)
    return res.status(200).json({
      status: true,
      post
    })
    // console.log(PostByState)
  } catch (error) {
    error.status = 404;
    error.message = error.message || "not accepted";
    next(error);
  }
};

const updateState = async (req, res, next) => {
  try {
    const postid = req.params.id
    const state = req.query.state
    const post = await PostModel.findById({ _id: postid })
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send("Not Authorised")
    }
    post.state = state 
    await post.save()

    return res.status(201).json({
      message: "state Updated succesfully",
      status: true,
    });

  } catch (error) {
    error.status = 404;
    error.message = error.message || "not accepted";
    next(error);
  }
}

const updatePost = async (req, res, next) => {
  try {
    const postid = req.params.id
    const post = await PostModel.findById({ _id: postid })
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send("Not Authorised")
    }
    let reading_time
    if (req.body.body) {
      reading_time = await CalculateReadingTime(req.body.body)
      await post.updateOne({ ...req.body, reading_time })
      return res.status(201).json({
        message: "edited succesfully",
        status: true
      });
    }
    await post.updateOne({ ...req.body })
    return res.status(201).json({
      message: "edited succesfully",
      status: true,
    });
    // await PostModel.findByIdAndUpdate(postid,req.body)
  } catch (error) {
    error.status = 404;
    error.message = error.message || "not accepted";
    next(error);
  }
}

const deletePost = async (req,res,next) => {
  try {
    const postid = req.params.id
    const post = await PostModel.findById({ _id: postid })
    // console.log(post)
    if(!post){
      return res.status(404).send("details not found")
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send("Not Authorised")
    }
    const user = await userModel.findById(req.user._id)
    user.posts = user.posts.filter(ids => ids.toString() !== postid)
    await user.save()
    await post.deleteOne()

    return res.status(201).json({
      message: "deleted succesfully",
      status: true,
    });
  } catch (error) {
    error.status = 404;
    error.message = error.message || "not accepted";
    next(error);
  }
}

module.exports = { createPost, getAllPosts, updateState, updatePost,deletePost };
