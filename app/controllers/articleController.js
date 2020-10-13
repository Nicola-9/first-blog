class ArticleController{
    constructor(){
        this.addArticleBtn = document.querySelector('#add-article-modal');
        this.modifyArticleBtn = document.querySelector('#modify-article-modal');
        this.articlesContainer = document.querySelector('.article-list-item');
        this.publicRadioElements = document.getElementsByName('inlineRadioOptions');
        this.featuredCheck = document.querySelector('#featured-article');

        this.restController = new RestController();
        this.articlesArray = this.restController.getArticles();
        this.currentArticle = null;
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
        this._showAddBtn();

        this.addArticleBtn.addEventListener('click', () =>{
            this._addArticle(false);
        });
    }

    setDeleteArticleListener(){
        let deleteBtns = document.querySelectorAll('.delete-btn');

        for(let i=0; i < deleteBtns.length; i++){
            deleteBtns[i].addEventListener('click', () =>{
                let articleId = deleteBtns[i].parentNode.childNodes[0].textContent;

                this.restController.deleteArticle("http://localhost:3000/articles/", articleId);
                location.reload();
            })
        }
    }

    setModifyArticleListener(){
        let modifyBtns = document.querySelectorAll('.modify-btn');

        for(let i=0; i < modifyBtns.length; i++){
            modifyBtns[i].addEventListener('click', () =>{
                let articleId = modifyBtns[i].parentNode.childNodes[0].textContent;

                document.querySelector('#modify-article-modal').style.display = "block";
                document.querySelector('#add-article-modal').style.display = "none";

                $('#modal-add-article').modal('show');

                this._fillModifyField(articleId);

                document.querySelector('#modify-article-modal').addEventListener('click', () =>{
                    this._modifyArticle(articleId);
                });
            });
        }
    }

    _addArticle(){
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
                bodyText: articleToAdd.getBodyText(),
                public: articleToAdd.isPublic(),
                featured: articleToAdd.isFeatured(),
                tags: articleToAdd.getTag()
        };

        let articleId = null;

        articleId = this.restController.postArticle("http://localhost:3000/articles", postArticle); 

        articleToAdd.id = articleId.data._id;

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
    }

    _fillModifyField(articleId){
        let articleTitle = document.querySelector('.title-article-input');
        let articleBody = document.querySelector('.body-text-article');
        let tags = document.querySelector('.tag-article');

        for (let i = 0; i < this.articlesArray.length; i++) {
            if (this.articlesArray[i].id === articleId) {
                articleTitle.value = this.articlesArray[i].getTitle();
                articleBody.textContent = this.articlesArray[i].bodyText;
                tags.textContent = this.articlesArray[i].tag;

                break;
            }
        }

        for (let i in this.publicRadioElements) {
            if (this.currentArticle.isPublic()) {
                if (this.publicRadioElements[i].value === "public") {
                    this.publicRadioElements[i].checked = true;
                }
            } else {
                if (this.publicRadioElements[i].value === "draft") {
                    this.publicRadioElements[i].checked = true;
                }
            }
        }

        if (this.currentArticle.featured) {
            this.featuredCheck.checked = true;
        } else {
            this.featuredCheck.checked = false;
        }
    }

    _modifyArticle(articleId){
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

        let articleToAdd = new Article(articleTitle, articleBody, isPublic, featured, tags, articleId);

        let modifiedArticle = {
                title: articleToAdd.title,
                bodyText: articleToAdd.getBodyText(),
                public: articleToAdd.isPublic(),
                featured: articleToAdd.isFeatured(),
                tags: articleToAdd.getTag()
        };

        this.restController.updateArticlePut("http://localhost:3000/articles/", articleId, modifiedArticle); 

        $('#modal-add-article').modal('hide');
    }

    _createNewArticle(articleObj){
        this.currentArticle = articleObj;

        let articleElement = document.createElement('article');
        let articleCard = document.createElement('div');
        let articleTitle = document.createElement('h2');
        let divButtons = document.createElement('div');
        let deleteButton = document.createElement('button');
        let modifyButton = document.createElement('button');
        let hiddenId = document.createElement('p');
        let articleBody = document.createElement('p');
        let articleFooter = document.createElement('div');

        divButtons.className += "float-right text-right";
        divButtons.style.fontSize = "1.5rem";
        divButtons.style.position = "relative";
        divButtons.style.marginTop = ".5rem";
        divButtons.style.right = ".5%";
        divButtons.style.width = "100%";

        hiddenId.className += "hidden-id";
        hiddenId.style.display = "none";
        hiddenId.textContent = articleObj.id;

        deleteButton.className += "btn btn-danger delete-btn";
        deleteButton.textContent = "ELIMINA";
        modifyButton.className += "btn btn-primary modify-btn";
        modifyButton.textContent = "MODIFICA";
        modifyButton.style.marginRight = "1%";

        divButtons.appendChild(hiddenId);
        divButtons.appendChild(modifyButton);
        divButtons.appendChild(deleteButton);

        articleElement.appendChild(divButtons);

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

    _showAddBtn(){
        document.querySelector('.modal-btn-article').addEventListener('click', () =>{
            document.querySelector('#modify-article-modal').style.display = "none";
            document.querySelector('#add-article-modal').style.display = "block";
        });
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