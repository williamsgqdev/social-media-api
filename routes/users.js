const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getOneUser,
  followUser,
  unfollowUser,
} = require("../controllers/users");

//UPDATE USER ROUTE
router.put("/:id", updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

//GET SINGLE USER
router.get("/:id", getOneUser);

//FOLLOW USER
router.put("/:id/follow", followUser);

//UNFOLLOW USER
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
