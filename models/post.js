const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    authorName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    state: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
