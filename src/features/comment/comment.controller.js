// importing required modules
import CommentModel from "../comment/comment.model.js";

export default class CommentController {
  async getAll(req, res,next) {
    try {
      const postId = parseInt(req.params.id);
      const allComments = CommentModel.findCommentByPost(postId);
      res.status(200).json({
        success: true,
        message: `comments for Post ${postId}`,
        comments: allComments,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async createComment(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const userId = parseInt(req.userID);
      const { content } = req.body;
      const newComment = CommentModel.add(userId, postId, content);
      res.status(200).json({
        success: true,
        message: "New Comment has been added for Post",
        Comment: newComment,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentId = parseInt(req.params.id);
      const userID = parseInt(req.userID);
      CommentModel.remove(commentId, userID);
      res.status(200).json({
        success: true,
        message: `Comment ${commentId} has been deleted`,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }
  async updateComment(req, res, next) {
    try {
      const commentId = parseInt(req.params.id);
      const { content } = req.body;
      const userId = req.userID;
      const updatedComment = CommentModel.update(commentId, content,userId);
      res.status(200).json({
        success: true,
        message: `You comment with id ${commentId} has been deleted`, 
        UpdatedComment: updatedComment,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
