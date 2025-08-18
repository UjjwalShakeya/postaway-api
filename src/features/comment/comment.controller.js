// importing required modules
import CommentModel from "../comment/comment.model.js";
import PostModel from "../post/post.model.js";

export default class CommentController {
  async getAll(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      if (isNaN(postId)) {
      throw new ApplicationError("Invalid post ID", 400);
    }

      const result = await CommentModel.findCommentByPost(postId, page, limit);

      res.status(200).json({
        success: true,
        message: `comments for Post ${postId}`,
        comments: result.comments,
        pagination: {
          totalPosts: result.totalComments,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        },
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async createComment(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.userID;
      const { content } = req.body;

      if (isNaN(postId)) {
      throw new ApplicationError("Invalid post ID", 400);
    }

      if (!content || content.trim() === "") {
        throw new ApplicationError("Comment content cannot be empty", 400);
      }

      // Check if post exists
      const postExists = await PostModel.findById(postId);
      if (!postExists) {
        throw new ApplicationError("Post not found", 404);
      }
      const newComment = await CommentModel.add(userId, postId, content);
      res.status(201).json({
        success: true,
        message: "New Comment has been added for Post",
        data: newComment,
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentId = parseInt(req.params.id);
      const userID = parseInt(req.userID);

      if (isNaN(commentId)) {
      throw new ApplicationError("Invalid comment ID", 400);
    }

      const deletedComment  = await CommentModel.remove(commentId, userID);
      res.status(200).json({
        success: true,
        message: `Comment ${commentId} has been deleted`,data:deletedComment
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = parseInt(req.params.id);
      const { content } = req.body;
      const userId = req.userID;
      const updatedComment = await CommentModel.update(
        commentId,
        content,
        userId
      );
      res.status(200).json({
        success: true,
        message: `You comment with id ${commentId} has been deleted`,
        UpdatedComment: updatedComment,
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
