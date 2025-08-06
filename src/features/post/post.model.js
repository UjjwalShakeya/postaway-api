// importing importand modules
import ApplicationError from "../../../utils/ApplicationError.js";
import LikeModel from "../like/like.model.js";
import CommentModel from "../comment/comment.model.js";

export let posts = [
  {
    id: 1,
    userId: 1,
    caption: "First post",
    imageUrl: "https://example.com/image1.jpg",
    status: "published",
    createdAt: new Date("2024-08-01T10:00:00Z")
  },
  {
    id: 2,
    userId: 2,
    caption: "Second post",
    imageUrl: "https://example.com/image2.jpg",
    status: "draft",
    createdAt: new Date("2024-07-28T09:15:00Z")
  },
  {
    id: 3,
    userId: 3,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
    createdAt: new Date("2024-07-30T14:45:00Z")
  },
  {
    id: 4,
    userId: 6,
    caption: " post",
    imageUrl: "https://example.com/image2.jpg",
    status: "published",
    createdAt: new Date("2024-08-03T08:30:00Z")
  },
  {
    id: 5,
    userId: 4,
    caption: "Third post",
    imageUrl: "https://example.com/image2.jpg",
    status: "draft",
    createdAt: new Date("2024-07-25T12:00:00Z")
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
      parseInt(userID),
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
    };

    posts[postIndex].status = newStatus;
    return posts[postIndex];
  };

  static getPostsSorted(by = "engagement") {
    if (!posts || posts.length === 0) {
      throw new ApplicationError("No posts found", 404);
    }

    // Compute engagement for each post
    const postsWithEngagement = posts.map((post) => {
      const likes = LikeModel.countByPostId(post.id);
      const comments = CommentModel.countByPostId(post.id);
      const engagement = likes + comments; // calculating engangement

      return {
        ...post,
        engagement,
      };
    });

    if (by === "date") {
      return postsWithEngagement.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // when two date objects are subtracted they are automatically converted to a number
      );
    }


    // Default: sort by engagement, then date
    return postsWithEngagement.sort((a, b) => {
      if (b.engagement === a.engagement) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.engagement - a.engagement;
    });
  }
}
