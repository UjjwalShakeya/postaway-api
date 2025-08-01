import { posts } from "../post/post.model.js";
import ApplicationError from "../../../utils/ApplicationError.js";

let comments = [
  { id: 1, userId: 1, postId: 1, content: "First comment on post 1" },
  { id: 2, userId: 2, postId: 1, content: "Second comment on post 1" },
  { id: 3, userId: 3, postId: 2, content: "First comment on post 2" },
];

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
  static findCommentByPost(id) {
    const isPostFoud = posts.find((p) => p.id == id);
    if (isPostFoud) {
      const allCommentsByPost = comments.filter((c) => c.postId == id);
      if (!allCommentsByPost || allCommentsByPost.length === 0) {
        throw new ApplicationError("could not get this post comments",404)
      }
      return allCommentsByPost;
    } else {
      throw new Error("comments dont not exist");
    }
  }

  static add(userId, postId, content) {
    const newComment = new CommentModel(
      comments.length + 1,
      userId,
      postId,
      content
    );
    const isCommentAdded = comments.push(newComment);
    if (isCommentAdded > 0) {
      return newComment;
    } else {
        throw new ApplicationError("something went wrong adding comment",400)

    }
  }
  static remove(id, userId) {
    const commentIndex = comments.findIndex(
      (c) => c.id == id && c.userId == userId
    );
    if (commentIndex == -1) {
        throw new ApplicationError("comment not found",404)

    }
    const isDeleted = comments.splice(commentIndex, 1);
    if (!isDeleted) {
        throw new ApplicationError("something went wrong deleting post",404)
    }
    return isDeleted;
  }
  static update(id, content, userId) {
    const commentIndex = comments.findIndex(
      (c) => c.userId == userId && c.id == id
    );

    if (commentIndex == -1) {
        throw new ApplicationError("could not find this comment",404)
    }
    comments[commentIndex].content = content;
    return comments[commentIndex];
  }
}
