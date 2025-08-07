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
}