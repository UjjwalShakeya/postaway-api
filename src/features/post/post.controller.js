// importing required modules
import PostModel from "./post.model.js";

export default class PostController {
  // retrieve all posts
  async getAllPosts(req, res) {
    try {
      const allPosts = PostModel.findAll();
      res
        .status(200)
        .json({ success: true, message: "All posts", data: allPosts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // retrieve post by the id
  async getPostById(req, res) {
    try {
      const id = req.params.id;
      const post = PostModel.findById(id);
      res
        .status(200)
        .json({ success: true, message: "Post by ID", data: post });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // retrieve post by the user credentials
  async getPostsByUser(req, res) {
    try {
      const userID = req.userID;
      const postsByUserId = PostModel.findByUserId(userID);
      res
        .status(200)
        .json({
          success: true,
          message: "Posts by userID",
          posts: postsByUserId,
        });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // created new post
  async createPost(req, res) {
    try {
      const userID = req.userID;
      const { caption, imageUrl } = req.body;
      PostModel.add(userID, caption, imageUrl);
      res
        .status(201)
        .json({ success: true, message: "new post has been created" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // update the new post
  async deletePost(req, res) {
    try {
      const postID = req.params.id;
      PostModel.delete(postID);
      res
        .status(200)
        .json({ success: true, message: `${postID} post has been deleted` });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // update the specific post
  async updatePost(req, res) {
    try {
      const postID = req.params.id;
      const newData = req.body;
      PostModel.update(postID,newData);
      res
        .status(201)
        .json({ success: true, message: `${postID} post has been updated`});
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
