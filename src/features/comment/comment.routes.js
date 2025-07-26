// imported important Packages
import express from "express";
// creating router from express
const commentRouter = express.Router();
import CommentController from "./comment.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// creating instance of controller
const CommentControllerInc = new CommentController();

// retrieving all the comments of specific post
commentRouter.get("/:id",jwtAuth, CommentControllerInc.getAll);

// // add a new comment to a specific post
commentRouter.post("/:id",jwtAuth, CommentControllerInc.createComment);

// // remove specific comment by id
// commentRouter.delete("/:id",jwtAuth, CommentControllerInc.deleteComment);

// // update specific comment by id
// commentRouter.put("/:id",jwtAuth, CommentControllerInc.updateComment);

export default commentRouter;
