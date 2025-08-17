// importing required modules
import PostModel from "./post.model.js";

export default class PostController {
  // retrieve all posts
  async getAllPosts(req, res, next) {
    try {
      const caption = req.query.caption || "";
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.max(parseInt(req.query.limit) || 10, 1);

      const result = await PostModel.findAll(page, limit, caption);

      res.status(200).json({
        success: true,
        message: "All posts",
        data: result.posts,
        pagination: {
          totalPosts: result.totalPosts,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        },
      });
    } catch (err) {
      next(err); // error handled by middleware
    }
  }

  // retrieve filtered posts
  async getFilteredPosts(req, res, next) {
    try {
      if (!req.query.caption) {
        return res.status(400).json({ message: "Caption query is required" });
      }
      const filteredPosts = await PostModel.filter(req.query.caption);
      res.status(200).json({
        success: true,
        message: "Filtered Posts",
        data: filteredPosts,
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // retrieve post by the id
  async getPostById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const post = await PostModel.findById(id);
      res
        .status(200)
        .json({ success: true, message: "Post found by ID", data: post });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // retrieve post by the user credentials
  async getPostsByUser(req, res, next) {
    try {
      const userID = req.userID;
      if (!userID) throw new ApplicationError("User ID required", 400);

      const postsByUserId = await PostModel.findByUserId(userID);
      res
        .status(200)
        .json({ success: true, message: "Post found", data: postsByUserId });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // created new post
  async createPost(req, res, next) {
    try {
      const userID = req.userID;
      const { caption, status } = req.body;
      const imageUrl = req.file.filename;

      if (!imageUrl) {
        return res.status(400).json({ message: "Image file is required" });
      }

      if (!caption) {
        return res.status(400).json({ message: "Caption field is required" });
      }

      // Allow only valid statuses
      const allowedStatuses = ["published", "draft"];
      const postStatus = allowedStatuses.includes(status)
        ? status
        : "published";

      const newPost = await PostModel.add(
        userID,
        caption,
        imageUrl,
        postStatus
      );
      res.status(201).json({
        success: true,
        message: "new post has been created",
        NewPost: newPost,
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // update the new post
  async deletePost(req, res, next) {
    try {
      const postID = parseInt(req.params.id);
      if (!postID) {
        return res.status(400).json({ message: "Post id is required" });
      }
      const deletedPost = await PostModel.delete(postID);
      res
        .status(200)
        .json({
          success: true,
          message: `${postID} post has been deleted`,
          deletedPost,
        });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // update the specific post
  async updatePost(req, res, next) {
    try {
      const userID = req.userID;
      const postID = parseInt(req.params.id);
      const newData = req.body;

      if (!postID || !userID)
        throw new ApplicationError("Missing post ID or user ID", 400);

      await PostModel.update(userID, postID, newData);
      res
        .status(200)
        .json({ success: true, message: `${postID} post has been updated` });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }

  // update the specific post status
  async postStatus(req, res, next) {
    try {
      const postID = parseInt(req.params.id);
      const userID = req.userID;
      const { status } = req.body;

      if (!postID || !userID) throw new ApplicationError("Missing post ID or user ID", 400);

      const isPostStatusUpdated = await PostModel.updateStatus(
        userID,
        postID,
        status
      );
      res
        .status(200)
        .json({ success: true, updatedStatus: isPostStatusUpdated });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }
  // Implement sorting of posts based on user engagement and date
  async getSortedPosts(req, res, next) {
    try {
      const allowedSorts = ["engagement", "date"];
      const sortBy = allowedSorts.includes(req.query.sortBy)
        ? req.query.sortBy
        : "engagement";

      const sortedPosts = await PostModel.getPostsSorted(sortBy);
      res.status(200).json({
        success: true,
        message: `Sorted posts by ${sortBy}`,
        data: sortedPosts,
      });
    } catch (err) {
      next(err); // calling next with error, error will be caught by errorhandler Middleware
    }
  }
}
