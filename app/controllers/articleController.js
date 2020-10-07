class ArticleController{
    constructor(){
        this.addArticleBtn = document.querySelector('#add-article-modal');
        this.articlesContainer = document.querySelector('.article-list-item');
        this.publicRadioElements = document.getElementsByName('inlineRadioOptions');
        this.featuredCheck = document.querySelector('#featured-article');

        this.restController = new RestController();
        this.articlesArray = this.restController.getArticles();
    }

    initializeArticlesDOMElement(){
        this._initializePublicAndDraft();

        for(let i in this.articlesArray){
            let article = this._createNewArticle(this.articlesArray[i]);

            if(this.articlesArray[i].isPublic()){
                if(this.articlesArray[i].featured){
                    let badgeFeatured = document.createElement('span');
                    badgeFeatured.className += "badge badge-secondary";
                    badgeFeatured.textContent = "In primo piano";
                    article.prepend(badgeFeatured);
                    this.publicArticlesElement.insertBefore(article, this.publicArticlesElement.children[1]);
                } else {
                    this.publicArticlesElement.appendChild(article);
                }
            } else{
                this.draftArticlesElement.appendChild(article);
            }

            if(this.publicArticlesElement.childNodes.length > 1){
                this.articlesContainer.appendChild(this.publicArticlesElement);
            }
            if(this.draftArticlesElement.childNodes.length > 1){
                this.articlesContainer.appendChild(this.draftArticlesElement);
            }
        }
        
        this.featuredCheck.disabled = false;
    }

    setAddArticleListener(){
        this.addArticleBtn.addEventListener('click', () =>{
            let articleTitle = document.querySelector('.title-article-input').value;
            let articleBody = document.querySelector('.body-text-article').value;
            let tags = document.querySelector('.tag-article').value;

            let isPublic = false;

            for(let i in this.publicRadioElements){
                if(this.publicRadioElements[i].checked){
                    if(this.publicRadioElements[i].value === "public"){
                        isPublic = true;
                    }
                }
            }
            
            let featured = this.featuredCheck.checked;

            let articleToAdd = new Article(articleTitle, articleBody, isPublic, featured, tags);

            let postArticle = {
                    title: articleToAdd.title,
                    body: articleToAdd.getBodyText(),
                    public: articleToAdd.isPublic(),
                    featured: articleToAdd.isFeatured(),
                    tag: articleToAdd.getTag()
            };

            this.restController.postArticle("https://texty-89895.firebaseio.com/posts.json", postArticle); 

            this.articlesArray.push(articleToAdd);

            let newArticle = this._createNewArticle(articleToAdd);

            if(articleToAdd.isPublic()){
                if(articleToAdd.featured){
                    let badgeFeatured = document.createElement('span');
                    badgeFeatured.className += "badge badge-secondary";
                    badgeFeatured.textContent = "In primo piano";
                    newArticle.prepend(badgeFeatured);
                    this.publicArticlesElement.insertBefore(newArticle, this.publicArticlesElement.children[1]);
                } else {
                    this.publicArticlesElement.appendChild(newArticle);
                }
            } else{
                this.draftArticlesElement.appendChild(newArticle);
            }

            if(this.publicArticlesElement.childNodes.length > 1){
                this.articlesContainer.appendChild(this.publicArticlesElement);
            }
            if(this.draftArticlesElement.childNodes.length > 1){
                this.articlesContainer.appendChild(this.draftArticlesElement);
            }

            $('#modal-add-article').modal('hide');

            window.scrollTo(0, newArticle.clientHeight + 15);
        });
    }

    _createNewArticle(articleObj){
        let articleElement = document.createElement('article');
        let articleCard = document.createElement('div');
        let articleTitle = document.createElement('h2');
        let articleBody = document.createElement('p');
        let articleFooter = document.createElement('div');

        articleElement.className += " article-list-item article card border-0 shadow";
        articleCard.classList.add("card-body");
        articleTitle.style.fontSize = "x-large";
        articleTitle.style.color = "#0056b3";
        articleTitle.style.marginBottom = "1rem";

        // Add Article Title
        articleTitle.textContent = articleObj.getTitle();

        //Add Article Body text
        articleBody.textContent = articleObj.getBodyText();

        // Append elements
        articleCard.appendChild(articleTitle);
        articleCard.appendChild(articleBody);

        if(articleObj.getTag() !== null){
            let tag = (typeof articleObj.tag) === "string" ? articleObj.tag : articleObj.tag.join(", ");

            articleFooter.className += "card-footer text-muted";
            articleFooter.textContent = tag;

            articleFooter.style.backgroundColor = "#fff";

            articleCard.appendChild(articleFooter);
        }
        
        articleElement.appendChild(articleCard);

        return articleElement;
    }

    _initializePublicAndDraft(){
        this.publicArticlesElement = document.createElement('div');
        this.draftArticlesElement = document.createElement('div');
        this.draftArticlesTitle = document.createElement('h1');
        this.publicArticlesTitle = document.createElement('h1');

        this.publicArticlesElement.prepend(this.publicArticlesTitle);
        this.draftArticlesElement.prepend(this.draftArticlesTitle);

        this._stylePublicAndDraft();
    }

    _stylePublicAndDraft(){
        this.publicArticlesElement.classList.add("public");
        this.draftArticlesElement.classList.add("draft");

        this.publicArticlesTitle.textContent = "PUBBLICI";
        this.publicArticlesTitle.style.float = "left";
        this.publicArticlesTitle.style.marginLeft = "1%";
        this.publicArticlesTitle.style.color = "#8a8a8a";
        this.publicArticlesTitle.style.fontSize = "2rem";

        this.draftArticlesTitle.textContent = "BOZZE";
        this.draftArticlesTitle.style.float = "left";
        this.draftArticlesTitle.style.marginLeft = "1%";
        this.draftArticlesTitle.style.color = "#8a8a8a";
        this.draftArticlesTitle.style.fontSize = "2rem";
    }
}