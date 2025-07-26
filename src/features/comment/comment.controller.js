import CommentModel from "../comment/comment.model.js";
import PostModel from "../post/post.model.js";

export default class CommentController {
  async getAll(req, res) {
    try {
      const postId = req.params.id;
      const allComments = CommentModel.findCommentByPost(postId);
      res.status(200).json({
        success: true,
        message: `comments for Post ${postId}`,
        comments: allComments,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  createComment(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.userID;
      const { content } = req.body;
      const newComment = CommentModel.add(userId, postId, content);
      res.status(200).json({
        success: true,
        message: "New Comment has been added for Post",
        Comment: newComment,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  deleteComment(req, res, next) {
    try {
      const commentId = req.params.id;
      const userID = req.userID;
      CommentModel.remove(commentId, userID);
      res.status(200).json({
        success: true,
        message: `Comment ${commentId} has been deleted`,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  // updateComment(req,res,next){

  // }
}
