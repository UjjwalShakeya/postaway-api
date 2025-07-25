import { posts } from "../post/post.model.js";

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
      if (!allCommentsByPost) {
        throw new Error("could not get this post comments");
      }
      return allCommentsByPost;
    }else{
      throw new Error("post does not exist");
    };
  }
}
