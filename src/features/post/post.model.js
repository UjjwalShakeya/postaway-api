// importing importand modules
import ApplicationError from "../../../utils/ApplicationError.js";

export let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post",
    imageUrl: "https://example.com/image1.jpg",
    status: "published",
  },
  {
    id: 2,
    userId: 2,
    caption: "Second post",
    imageUrl: "https://example.com/image2.jpg",
    status: "draft",
  },
  {
    id: 3,
    userId: 3,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
  },
  {
    id: 4,
    userId: 6,
    caption: " post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
  },
  {
    id: 5,
    userId: 4,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "draft",
  },
];

export default class PostModel {
  constructor(id, userId, caption, imageUrl, status) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.status = status;
  }

  // Get all posts
  static findAll() {
    if (!posts || posts.length <= 0) {
      throw new ApplicationError("Posts Not Found", 404);
    }
    return posts;
  }

  // filtering the posts
  static filter(caption) {
    let filterPosts = posts;
    const searchWords = caption.toLowerCase().trim().split(/\s+/); // ["THIRD", "POST"]

    filterPosts = posts.filter((post) => {
      const postCaption = post.caption.toLowerCase();
      return searchWords.every((word) => postCaption.includes(word));
    });

    if (!filterPosts || filterPosts.length <= 0) {
      throw new ApplicationError("Posts Not Found", 404);
    }
    return filterPosts;
  }

  // Get post by ID
  static findById(id) {
    const post = posts.find((p) => p.id === Number(id));
    if (!post) {
      throw new ApplicationError("Posts by Id Not Found", 404);
    }
    return post;
  }

  // create a new post
  static add(userID, caption, image, status) {
    const missingFields = [];
    if (!userID) missingFields.push("userID");
    if (!caption) missingFields.push("caption");
    if (!image) missingFields.push("image");

    if (missingFields.length > 0) {
      throw new ApplicationError(
        `Could not create post: missing ${missingFields.join(", ")}`,
        404
      );
    }
    const Post = new PostModel(
      posts.length + 1,
      userID,
      caption,
      image,
      status
    );
    const newPost = posts.push(Post);
    if (newPost <= 0) {
      throw new ApplicationError("could not add post", 404);
    }
    return Post;
  }

  // find posts of logged-in users
  static findByUserId(userId) {
    const postsFound = posts.filter((p) => p.userId == userId);
    if (postsFound.length <= 0) {
      throw new ApplicationError("could not get posts", 404);
    }
    return postsFound;
  }

  // delete specific post
  static delete(postId) {
    const ispostFound = posts.findIndex((p) => p.id == postId);
    if (ispostFound == -1) {
      throw new ApplicationError("could not find post", 404);
    }
    posts.splice(ispostFound, 1);
    return posts[ispostFound];
  }

  // updating post
  static update(id, data) {
    const postIndex = posts.findIndex((p) => p.id == id);
    if (postIndex == -1) {
      throw new ApplicationError("Post Not Found", 404);
    }
    posts[postIndex] = {
      ...posts[postIndex],
      ...data,
    };
  }

  static updateStatus(userId, postId, newStatus) {
    const postIndex = posts.findIndex(
      (p) => p.id == postId && p.userId == userId
    );
    if (postIndex === -1) {
      throw new ApplicationError("Post Not Found", 404);
    }

    const currentStatus = posts[postIndex].status;
    const allowedTransitions = {
      draft: ["published"],
      published: ["archived"],
      archived: ["published"],
    };

    // Check if newStatus is allowed for currentStatus
    if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
      throw new ApplicationError(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'`,
        400
      );
    }

    posts[postIndex].status = newStatus;
    return posts[postIndex];
  }
}
