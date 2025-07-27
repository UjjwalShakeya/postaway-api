// importing required modules
import LikeModel from "./like.model.js";

export default class LikeController {
  async getAllLikes(req, res, next) {
    try {
      const postId = req.params.postid;
      const allLikes = LikeModel.getAll(postId); 
       res.status(200).json({
        success: true,
        message: `All likes have been retrieved from specific post`,
        AllLikes: allLikes,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addLike(req, res, next) {
    try {
      const userId = req.userID;
      const postId = req.params.postid;
      const newLike = LikeModel.add(userId, postId);
      res.status(200).json({
        success: true,
        message: `like is added to ${postId}`,
        NewLike: newLike,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  async deleteLike(req, res, next) {
    try {
      const userId = req.userID;
      const postId = req.params.postid;
      LikeModel.delete(userId, postId);
      res.status(200).json({
        success: true,
        message: `like of user ${userId} is removed `,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
