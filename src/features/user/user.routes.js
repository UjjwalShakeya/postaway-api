// imported important Packages
import express from "express";
import validateUser from "../../middlewares/validator.middleware.js";
import UserController from "./user.controller.js";

// making instance of userController
const userControllerInc = new UserController();

// creating router from express
const userRouter = express.Router();

// user router for signup
userRouter.post("/signup", validateUser, (req, res, next) =>
  userControllerInc.SignUp(req, res, next)
);

// user router for signin
userRouter.post("/signin", (req, res, next) =>
  userControllerInc.SignIn(req, res, next)
);

export default userRouter;
