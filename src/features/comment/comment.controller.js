import CommentModel from "../comment/comment.model.js";

export default class CommentController {
  async getAll(req, res) {
    try {
      const postId = req.params.id;
      const allComments = CommentModel.findCommentByPost(postId);
      res
        .status(200)
        .json({
          success: true,
          message: `comments for Post ${postId}`,
          comments: allComments,
        });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  // createComment(req,res,next){

  // }
  // deleteComment(req,res,next){

  // }
  // updateComment(req,res,next){

  // }
}
