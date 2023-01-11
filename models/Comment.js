class Comment {
    constructor(
        id,
        postId,
        userId,
        userName,
        comment,
        replies,
        likes,
        parentId
    ) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.userName = userName;
        this.comment = comment;
        this.replies = replies;
        this.likes = likes;
        this.parentId = parentId;
    }
}

export default Comment;
