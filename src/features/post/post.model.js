export let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post",
    imageUrl: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    userId: 2,
    caption: "Second post",
    imageUrl: "https://example.com/image2.jpg",
  }
];

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  // Get all posts
  static findAll() {
    return posts;
  }

  // Get post by ID
  static findById(id) {
    const post = posts.find((p) => p.id === Number(id));
    if (!post) {
      throw new Error("Post Not Found");
    }
    return post;
  }

  // create a new post
  static add(userID, caption, image) {
    if (!userID || !caption || !image){
      throw new Error("could not create post");
    };
    const Post = new PostModel(posts.length + 1, userID, caption, image);
    const newPost = posts.push(Post);
    if (newPost <= 0) {
      throw new Error("could not create post");
    }
    return Post;
  }

  // find posts of logged-in users
  static findByUserId(userID) {
    const postsFound = posts.filter((p) => p.userId == userID);
    if (postsFound <= 0) {
      throw new Error("could not get posts");
    }
    return postsFound;
  }
  // delete specific post
  static delete(postID) {
    const ispostFound = posts.findIndex((p) => p.id == postID);
     if (ispostFound == -1) {
      throw new Error("could not find post");
    }
    posts.splice(ispostFound,1);
    console.log(posts);
    return posts[ispostFound];
  };

  // updating post
  static update(id,data) {
    const postIndex = posts.findIndex(p => p.id == id);
    if (postIndex == -1){
        throw new Error("Post Not Found");
    }
    posts[postIndex] = {
      ...posts[postIndex],
      ...data
    };
  };
}
