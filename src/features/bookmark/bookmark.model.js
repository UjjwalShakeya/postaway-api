// importing important require modules

import ApplicationError from "../../../utils/ApplicationError.js";
import PostModel from "../post/post.model.js";

const AllBookMarks = [
  {
    id: 1,
    userId: 2,
    postId: 2,
  },
];

export default class bookmarkModel {
  constructor(id, postid, userid) {
    this.id = id;
    this.postid = postid;
    this.userid = userid;
  }

  static get(userId) {
    if (!AllBookMarks || AllBookMarks.length == 0) {
      throw new ApplicationError("there is no bookmarked posts", 404);
    }
    // Get only bookmarks for this user
    const userBookmarkedPosts = AllBookMarks.filter((p) => p.userId === userId);

    if (userBookmarkedPosts.length === 0) {
      throw new ApplicationError("No bookmarks found for this user", 404);
    }

    const allPosts = PostModel.findAll();

    // Filter posts that are bookmarked
    const bookmarkedPosts = allPosts.filter((post) =>
      userBookmarkedPosts.some(
        (bookmark) => bookmark.postId === post.id && post.status != "draft"
      )
    );

    if (bookmarkedPosts.length === 0) {
      throw new ApplicationError("No bookmarks found for this user", 404);
    }
    return bookmarkedPosts;
  }

  static add(userId, postId) {
    const newBookMark = new bookmarkModel(
      AllBookMarks.length + 1,
      userId,
      postId
    );

    if (!newBookMark) {
      throw new ApplicationError(
        "something went wrong while adding to bookmark",
        400
      );
    }

    return newBookMark;
  }

  static delete() {}
}
