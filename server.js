// Imported important Packages
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import PostRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";

// creating an instance of express
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data


// User Router On Default 
app.use("/api", userRouter);

// post Router On post 
app.use("/api/posts", PostRouter);

// comment Router On post 
app.use("/api/comments",commentRouter);

// // like Router On post 
// app.use("/api/likes", LikeRouter);

// setup server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is live on 3000");
});

