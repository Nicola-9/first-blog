function Article(title, bodyText, public, featured, tag){
    this.title = title;
    this.bodyText = bodyText;
    this.public = public;
    this.featured = featured;
    this.tag = tag;

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

Article.prototype.isPublic = function(){
    return this.public;
};

Article.prototype.setPublic = function(public){
    this.public = public;
};

Article.prototype.isFeatured = function(){
    return this.featured;
};

Article.prototype.setFeatured = function(featured){
    this.featured = featured;
};

Article.prototype.getTag = function(){
    return this.tag;
};

Article.prototype.setTag = function(tag){
    this.tag = tag;
};