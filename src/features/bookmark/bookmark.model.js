// importing important require modules

import ApplicationError from "../../../utils/ApplicationError.js"
import PostModel from "../post/post.model.js";

const AllBookMarks = [
  {
    id: 1,
    userId: 1,
    postId: 2
  }
]

export default class bookmarkModel {
  static get(userId) {
    if (!AllBookMarks || AllBookMarks.length == 0) {
      throw new ApplicationError('there is no bookmarked posts', 404);
    };
    // Get only bookmarks for this user
    const userBookmarkedPosts = AllBookMarks.filter(p => p.userId === userId);

    if (userBookmarkedPosts.length === 0) {
      throw new ApplicationError('No bookmarks found for this user', 404);
    }

    const allPosts = PostModel.findAll();

    // Filter posts that are bookmarked
    const bookmarkedPosts = allPosts.filter(post =>
      userBookmarkedPosts.some(bookmark => bookmark.postId === post.postId)
    );
    return bookmarkedPosts;
  };

  static add() {

  }
  static delete() {

  }
}