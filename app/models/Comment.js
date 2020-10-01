class Comment{
    constructor(user, commentText){
        this.user = user;
        this.commentText = commentText;
    }

    getUser(){
        return this.user;
    }

    setUser(user){
        this.user = user;
    }

    getCommentText(){
        return this.commentText;
    }

    setCommentText(commentText){
        this.commentText = commentText;
    }
}