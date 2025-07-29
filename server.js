// Imported important Packages
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import PostRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import LikeRouter from "./src/features/like/like.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

// creating an instance of express
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// using logger middlware for every request
app.use(loggerMiddleware);

// User Router On Default 
app.use("/api", userRouter);

// post Router On post 
app.use("/api/posts", PostRouter);

// comment Router On post 
app.use("/api/comments",commentRouter);

// // like Router On post 
app.use("/api/likes", LikeRouter);

// setup server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is live on 3000");
});

