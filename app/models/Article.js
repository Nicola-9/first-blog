class Article{
    constructor(title, bodyText, publics = true, featured = false, tag = []){
        this.title = title;
        this.bodyText = bodyText;
        this.publics = publics;
        this.featured = featured;
        this.tag = tag;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getBodyText(){
        return this.bodyText;
    }

    setBodyText(){
        this.bodyText = bodyText;
    }

    isPublic(){
        return this.publics;
    }

    setPublic(publics){
        this.publics = publics;
    }

    isFeatured(){
        return this.featured;
    }

    setFeatured(featured){
        this.featured = featured;
    }

    getTag(){
        return this.tag;
    }

    setTag(tag){
        if(typeof tag === "string"){
            this.tag.push(tag);
        }
        else{
            this.tag = tag;
        }
    }
}