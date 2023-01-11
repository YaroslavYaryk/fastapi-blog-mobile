class CommentReply {
    constructor(id, postId, userId, userName, comment) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.userName = userName;
        this.comment = comment;
    }
}

export default CommentReply;
