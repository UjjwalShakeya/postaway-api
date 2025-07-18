// imported important Packages
import express from "express";

import UserController from "./user.controller.js";

// making instance of userController
const userControllerInc = new UserController();

// creating router from express
const userRouter = express.Router();

// user router for signup
userRouter.post("/signup",userControllerInc.SignUp);

// user router for signin
userRouter.post("/signin",userControllerInc.SignIn);

export default userRouter;
