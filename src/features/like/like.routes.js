// importing required modules
import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const LikeRouter = express.Router();

const LikeControllerInc = new LikeController()

// adding like to an specific post 
LikeRouter.post('/toggle/:postId',jwtAuth,LikeControllerInc.addLike);

// // retrieve all likes 
LikeRouter.get('/:postid',jwtAuth,LikeControllerInc.getAllLikes);

// deleting the like on delete request
LikeRouter.delete('/toggle/:postId', jwtAuth,LikeControllerInc.deleteLike);


export default LikeRouter;