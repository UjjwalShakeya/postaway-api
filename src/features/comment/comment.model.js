import PostModel from "../post/post.model.js";
import ApplicationError from "../../../utils/ApplicationError.js";

let comments = [
  { id: 1, userId: 1, postId: 1, content: "First comment on post 1" },
  { id: 2, userId: 2, postId: 1, content: "Second comment on post 1" },
  { id: 3, userId: 3, postId: 1, content: "Great photo!" },
  { id: 4, userId: 4, postId: 1, content: "Nice shot!" },
  { id: 5, userId: 5, postId: 1, content: "Looks amazing!" },
  { id: 6, userId: 6, postId: 2, content: "Great capture" },
  { id: 7, userId: 7, postId: 2, content: "Love this vibe" },
  { id: 8, userId: 8, postId: 2, content: "Where was this taken?" },
  { id: 9, userId: 9, postId: 2, content: "Beautiful scenery" },
  { id: 10, userId: 10, postId: 2, content: "Awesome colors" },
  { id: 11, userId: 3, postId: 2, content: "I want to go there!" },
  { id: 12, userId: 5, postId: 2, content: "Perfect timing" },
  { id: 13, userId: 4, postId: 2, content: "Cool shot" },
  { id: 14, userId: 9, postId: 1, content: "Love this place" },
  { id: 15, userId: 2, postId: 1, content: "This is stunning" },
  { id: 16, userId: 10, postId: 1, content: "Absolutely gorgeous" },
  { id: 17, userId: 7, postId: 1, content: "Wow, breathtaking" },
  { id: 18, userId: 6, postId: 1, content: "So peaceful" },
  { id: 19, userId: 1, postId: 1, content: "Love the mood" },
  { id: 20, userId: 8, postId: 1, content: "Incredible shot" },
];

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
  static async findCommentByPost(postId, page, limit) {
    const isPostFoud = PostModel.findById(postId);

    if (!isPostFoud) {
      throw new ApplicationError("Post not found", 404);
    }

    const allCommentsByPost = comments.filter((c) => c.postId === postId);

    if (allCommentsByPost.length === 0) {
      throw new ApplicationError("No comments found for this post", 404);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedComments = allCommentsByPost.slice(startIndex, endIndex);

    return {
      comments: paginatedComments,
      totalComments: allCommentsByPost.length,
      totalPages: Math.ceil(allCommentsByPost.length / limit),
      currentPage: page,
    };
  }

  static async add(userId, postId, content) {
    const newComment = new CommentModel(
      comments.length + 1,
      userId,
      postId,
      content
    );
    comments.push(newComment);
    return newComment;
  }
  static async remove(id, userId) {
    const commentIndex = comments.findIndex(
      (c) => c.id === id && c.userId === userId
    );
    if (commentIndex == -1) {
      throw new ApplicationError("comment not found", 404);
    }
    const [deletedComment] = comments.splice(commentIndex, 1);

    if (!deletedComment) {
      throw new ApplicationError("Something went wrong deleting comment", 500);
    }

    return deletedComment;
  }

  static async update(id, content, userId) {
    const commentIndex = comments.findIndex(
      (c) => c.userId === userId && c.id === id
    );

    if (commentIndex === -1) {
      throw new ApplicationError("Comment not found or not authorized", 404);
    }
    const oldContent = comments[commentIndex].content;
    if (oldContent === content.trim()) {
      throw new ApplicationError(
        "New content must be different from the old one",
        400
      );
    }

    comments[commentIndex].content = content.trim();
    return comments[commentIndex];
  }

  static async countByPostId(postId) {
    return comments.filter((comment) => comment.postId === postId).length;
  }
}
