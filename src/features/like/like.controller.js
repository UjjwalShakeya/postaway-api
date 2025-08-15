// importing required modules
import LikeModel from "./like.model.js";

export default class LikeController {
  async getAllLikes(req, res, next) {
    try {
      const postId = parseInt(req.params.postid);
      if (!postId) {
        return res.status(400).json({ success: false, message: "Invalid postId" });
      }
      const allLikes = await LikeModel.getAll(postId); 
       res.status(200).json({
        success: true,
        message: `All likes have been retrieved from specific post`,
        Likes: allLikes,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  };

  async addLike(req, res, next) {
    try {
      const userId = req.userID;
      const postId = parseInt(req.params.postId);
      
      const newLike = await LikeModel.add(userId, postId);
      res.status(200).json({
        success: true,
        message: `like is added to ${postId}`,
        NewLike: newLike,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  };

  async deleteLike(req, res, next) {
    try {
      const userId = req.userID;
      const postId = parseInt(req.params.postId);
      await LikeModel.delete(userId, postId);
      res.status(200).json({
        success: true,
        message: `like of user ${userId} is removed `,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
