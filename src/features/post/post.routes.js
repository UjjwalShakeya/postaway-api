//  importing required packages
import express from "express";
// importing the jwt token
import jwtAuth from "../../middlewares/jwt.middleware.js";
import upload from "../../middlewares/fileUpload.middleware.js"

//  importing post controller
import PostController from "./post.controller.js";
const PostControllerInc = new PostController();

// creating post router with express
const PostRouter = express.Router();

PostRouter.get("/all", PostControllerInc.getAllPosts); // Retrieve all posts

PostRouter.get("/filter", PostControllerInc.getFilteredPosts); // Get posts on the basis of filter

PostRouter.get("/", jwtAuth, PostControllerInc.getPostsByUser); // Retrieve post on the user credentials

// route for sorted posts
PostRouter.get("/sorted",jwtAuth, PostControllerInc.getSortedPosts); 

PostRouter.post("/", jwtAuth,upload.single('imageUrl'), PostControllerInc.createPost); // create a new post

PostRouter.get("/:id", PostControllerInc.getPostById); // Retrieve a specific post by id

PostRouter.delete("/:id",jwtAuth, PostControllerInc.deletePost); // delete a specific post by id 

PostRouter.put("/:id",jwtAuth, PostControllerInc.updatePost); // Update a specific post by ID (Image upload functionality included)

PostRouter.patch("/:id/status",jwtAuth, PostControllerInc.postStatus); // check a specific post status

export default PostRouter;
