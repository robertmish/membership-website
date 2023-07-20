import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postUserId: {
    type: String,
    required: true,
    unique: false,
  },
  postTitle: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  postText: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  postDateAdded: {
    type: String,
  },

  published: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
