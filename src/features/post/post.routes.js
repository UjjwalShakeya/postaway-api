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

PostRouter.get("/:id", PostControllerInc.getPostById); // Retrieve a specific post by id

PostRouter.get("/", jwtAuth, PostControllerInc.getPostsByUser); // Retrieve post on the user credentials

PostRouter.post("/", jwtAuth,upload.single('imageUrl'), PostControllerInc.createPost); // create a new post

PostRouter.delete("/:id",jwtAuth, PostControllerInc.deletePost); // delete a specific post by id 

PostRouter.put("/:id",jwtAuth, PostControllerInc.updatePost); // Update a specific post by ID (Image upload functionality included)

export default PostRouter;
