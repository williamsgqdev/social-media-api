const Post = require("../models/Post");
const User = require("../models/User");

//CREATE NEW POST
const createPost = async (req, res) => {
  const newPost = await new Post(req.body);

  try {
    const post = await newPost.save();

    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//UPDATE POST
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Sucessfully updated post");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Sucessfully deleted post");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//LIKE AND UNLIKE A POST
const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("you liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("you disliked this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET A POST
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET TIMELINE POST
const getTimelinePost = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: user._id });
    const followingsPosts = await Promise.all(
      user.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );

    res.status(200).json(userPosts.concat(...followingsPosts));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeAndUnlikePost,
  getSinglePost,
  getTimelinePost,
};
