const router = require("express").Router();

const {
  createPost,
  updatePost,
  deletePost,
  likeAndUnlikePost,
  getSinglePost,
  getTimelinePost,
} = require("../controllers/posts");

//Create Post
router.post("/", createPost);

//Update Post
router.put("/:id", updatePost);

//delete Post
router.delete("/:id", deletePost);

//react to Post
router.put("/:id/like", likeAndUnlikePost);

//get a post
router.get("/:id", getSinglePost);

//get a post
router.get("/timeline/all", getTimelinePost);

module.exports = router;
