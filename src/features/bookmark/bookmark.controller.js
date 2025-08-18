// importin important required modules right here
import bookmarkModel from "./bookmark.model.js";

export default class bookmarkController {
  async getBookmarkedPosts(req, res, next) {
    try {
      const userId = parseInt(req.userID);
      if (isNaN(userId)) {
        throw new ApplicationError("Invalid user ID", 400);
      }

      const getAllBookmarkedPosts = await bookmarkModel.get(userId);

      res.status(200).json({
        success: true,
        message: `Bookmarked posts retrieved successfully`,
        count: bookmarkedPosts.length, // Helpful for clients
        data: getAllBookmarkedPosts,
      });
    } catch (err) {
      next(err);
    }
  }

  async createBookmark(req, res, next) {
    const userId = parseInt(req.userID);
    const postId = parseInt(req.params.postid);

    try {
      bookmarkModel.add(userId, postId);
      res.status(201).json({
        success: true,
        message: `your post with id ${postId} has been bookmarked`,
      });
    } catch (err) {
      next(err);
    }
  }

  async removeBookmark(req, res, next) {
    const userId = parseInt(req.userID);
    const postId = parseInt(req.params.postid);
    try {
      const result = bookmarkModel.delete(userId, postId);
      res.status(200).json({
        success: true,
        message: `your post with id ${postId} has been removed from bookmark`,
        removedPost: result,
      });
    } catch (err) {
      next(err);
    }
  }
}
