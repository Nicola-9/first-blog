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

document.addEventListener('DOMContentLoaded', () =>{
    let addArticleBtn = document.querySelector('#add-article-modal');

    addArticleBtn.addEventListener('click', () =>{
        let articleTitle = document.querySelector('.title-article-input').value;
        let articleBody = document.querySelector('.body-text-article').value;
        let articlesContainer = document.querySelector('.article-list-item');

        let articleToAdd = new Article(articleTitle, articleBody);

        let newArticle = createNewArticle(articleToAdd);

        articlesContainer.appendChild(newArticle);

        $('#exampleModal').modal('hide');

        window.scrollTo(0, newArticle.clientHeight + 15);
    });
});

function createNewArticle(articleObj){
    let articleParent = document.createElement('article');
    let articleFirstChild = document.createElement('article');
    let articleCard = document.createElement('div');
    let articleTitle = document.createElement('h2');
    let articleBody = document.createElement('p');

    articleFirstChild.className += " article-list-item article card border-0 shadow";
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
    articleFirstChild.appendChild(articleCard);
    articleParent.appendChild(articleFirstChild);

    return articleParent;
}
