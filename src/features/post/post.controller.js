// importing required modules
import PostModel from "./post.model.js";

export default class PostController {
  // retrieve all posts
  async getAllPosts(req, res,next) {
    try {
      const allPosts = PostModel.findAll();
      res
        .status(200)
        .json({ success: true, message: "All posts", data: allPosts });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // retrieve post by the id
  async getPostById(req, res,next) {
    try {
      const id = req.params.id;
      const post = PostModel.findById(id);
      res
        .status(200)
        .json({ success: true, message: "Post by ID", data: post });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // retrieve post by the user credentials
  async getPostsByUser(req, res,next) {
    try {
      const userID = req.userID;
      const postsByUserId = PostModel.findByUserId(userID);
      res.status(200).json({
        success: true,
        message: "Posts by userID",
        posts: postsByUserId,
      });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // created new post
  async createPost(req, res,next) {
    try {
      const userID = req.userID;
      const { caption } = req.body;
      const imageUrl = req.file.filename;
      const newPost = PostModel.add(userID, caption, imageUrl);
      res
        .status(201)
        .json({
          success: true,
          message: "new post has been created",
          NewPost: newPost,
        });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // update the new post
  async deletePost(req, res,next) {
    try {
      const postID = req.params.id;
      PostModel.delete(postID);
      res
        .status(200)
        .json({ success: true, message: `${postID} post has been deleted` });
    } catch (err) {
     next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // update the specific post
  async updatePost(req, res,next) {
    try {
      const postID = req.params.id;
      const newData = req.body;
      PostModel.update(postID, newData);
      res
        .status(201)
        .json({ success: true, message: `${postID} post has been updated` });
    } catch (err) {
      next(err);// calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
