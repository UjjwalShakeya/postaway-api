// imported important Packages
import express from "express";
// creating router from express
const commentRouter = express.Router();
import CommentController from "./comment.controller.js";

// creating instance of controller
const CommentControllerInc = new CommentController();

// retrieving all the comments of specific post
commentRouter.get("/:id", CommentControllerInc.getAll);

// // add a new comment to a specific post
// commentRouter.post("/:id", CommentControllerInc.createComment);

// // remove specific comment by id
// commentRouter.delete("/:id", CommentControllerInc.deleteComment);

// // update specific comment by id
// commentRouter.put("/:id", CommentControllerInc.updateComment);

export default commentRouter;
