const User = require("../models/User");
const bcrypt = require("bcrypt");
//UPDATE USER
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account sucessfully Updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can make changes to only your account");
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been Deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("You dont have permission to perform this action");
  }
};

//GET SINGLE USER
const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.json(500).json(err);
  }
};

//FOLLOW  USER
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });

        res.status(200).json(`you are now folowing ${user.username}`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot follow your account");
  }
};


//UNFOLLOW  USER
const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });

        res.status(200).json(`you unfollowed ${user.username}`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot unfollow your account");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getOneUser,
  followUser,
  unfollowUser
};
