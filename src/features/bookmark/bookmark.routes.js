// importing required modules
import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import bookmarkController from "./bookmark.controller.js";

// making an instance of bookmarked controller 
const bookmarkControllerInc = new bookmarkController();

const bookmarkRouter = express.Router();

// getting all posts which are bookmarked
bookmarkRouter.get('/',jwtAuth, bookmarkControllerInc.getBookmarkedPosts);


export default bookmarkRouter;