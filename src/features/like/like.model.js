// importing required module
import ApplicationError from "../../../utils/ApplicationError.js";

let likes = [
    { id: 1, userId: 1, postId: 1 },
    { id: 2, userId: 2, postId: 1 },
    { id: 3, userId: 3, postId: 2 },
    { id: 4, userId: 5, postId: 2 },
    { id: 5, userId: 70, postId: 2 }
];

export default class LikeModel{
    constructor(id,userId,postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    };

    // get all likes
    static getAll(postId){
        const allLikes = likes.filter(l => l.postId == postId);
        if (!allLikes || allLikes.length <= 0){
            throw new ApplicationError("could not get likes of this post",  404)          
        }
        return allLikes;
    };

    // like specific post post 
    static add(userId,postId){
        const newLike = new LikeModel(likes.length + 1 ,userId,postId);
        const isLikeAdded = likes.push(newLike);
        if (!isLikeAdded  || isLikeAdded <=0){
            throw new ApplicationError("could not like this post",  404)            
        }
        return newLike;
    };
    // like specific post post 
    static delete(userId,postId){
        const likeIndex = likes.findIndex(l => l.userId == userId && l.postId == postId);
        if (likeIndex == -1){
            throw new ApplicationError("like is not found",  404)          
        }
        likes.splice(likeIndex,1);
        console.log(likes);
        return likeIndex;
    };
}