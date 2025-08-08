// importin important required modules right here
import bookmarkModel from "./bookmark.model.js"

export default class bookmarkController {
    async getBookmarkedPosts(req, res, next) {
        const userId = parseInt(req.userID);

        try {
            const getAllBookmarkedPosts = bookmarkModel.get(userId);
            res.status(200).json({
                success: true,
                message: `All Bookmarked Posts`,
                posts: getAllBookmarkedPosts,
            });
        } catch (err) {
            next(err);
        };
    };

    async createBookmark(req, res, next) {
        const userId = parseInt(req.userID);
        const postId = parseInt(req.params.postid);
        
        try {
            bookmarkModel.add(userId,postId);
            res.status(201).json({
                success: true,
                message: `your post with id ${postId} has been bookmarked`,
            });
        } catch (err) {
            next(err);
        };
    };

};