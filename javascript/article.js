function Article(title, bodyText){
    this.title = title;
    this.bodyText = bodyText;

    this.getTitle = () =>{
        return this.title;
    };
}

Article.prototype.getBodyText = function(){
    return this.bodyText;
};

Article.prototype.setTitle = function(title){
    this.title = title;
};

Article.prototype.setBodyText = function(bodyText){
    this.bodyText = bodyText;
};