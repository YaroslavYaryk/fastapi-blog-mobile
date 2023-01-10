class Blog {
    constructor(id, title, body, authorId, authorName, likes, comments) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.authorId = authorId;
        this.authorName = authorName;
        this.likes = likes;
        this.comments = comments;
    }
}

export default Blog;
