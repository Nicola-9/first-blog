// Override array method toString()
Array.prototype.toString = function(){
    let str = "";

    for(let i in this){
        str += "\n" + i + ". Title -> " + this[i].title;
    }

    return str;
}

document.addEventListener('DOMContentLoaded', () =>{
    let addArticleBtn = document.querySelector('#add-article-modal');
    let articlesContainer = document.querySelector('.article-list-item');
    let publicArticlesElement = document.createElement('div');
    let draftArticlesElement = document.createElement('div');
    let draftArticlesTitle = document.createElement('h1');
    let publicArticlesTitle = document.createElement('h1');

    publicArticlesElement.prepend(publicArticlesTitle);
    draftArticlesElement.prepend(draftArticlesTitle);

    publicArticlesElement.classList.add("public");
    draftArticlesElement.classList.add("draft");

    publicArticlesTitle.textContent = "PUBBLICI";
    publicArticlesTitle.style.float = "left";
    publicArticlesTitle.style.marginLeft = "1%";
    publicArticlesTitle.style.color = "#8a8a8a";
    publicArticlesTitle.style.fontSize = "2rem";

    draftArticlesTitle.textContent = "BOZZE";
    draftArticlesTitle.style.float = "left";
    draftArticlesTitle.style.marginLeft = "1%";
    draftArticlesTitle.style.color = "#8a8a8a";
    draftArticlesTitle.style.fontSize = "2rem";

    let articlesArray = getRandomArticles();

    console.log(articlesArray);

    for(let i in articlesArray){
        let article = createNewArticle(articlesArray[i]);

        if(articlesArray[i].isPublic()){
            publicArticlesElement.appendChild(article);
        } else{
            draftArticlesElement.appendChild(article);
        }

        if(publicArticlesElement.childNodes.length > 1){
            articlesContainer.appendChild(publicArticlesElement);
        }
        if(draftArticlesElement.childNodes.length > 1){
            articlesContainer.appendChild(draftArticlesElement);
        }
    }

    let radiosElem = document.getElementsByName('inlineRadioOptions');
    let featuredCheck = document.querySelector('#featured-article');

    for(let i in radiosElem){
        radiosElem[i].onclick = () =>{
            if(radiosElem[i].value !== "public")
                featuredCheck.checked = false;
            
            featuredCheck.disabled = (radiosElem[i].value === "public") ? false : true;
        };
    }

    addArticleBtn.addEventListener('click', () =>{
        let articleTitle = document.querySelector('.title-article-input').value;
        let articleBody = document.querySelector('.body-text-article').value;

        let radios = document.getElementsByName('inlineRadioOptions');
        let isPublic = false;

        let featured = document.querySelector('#featured-article').checked;

        for(let i in radios){
            if(radios[i].checked){
                if(radios[i].value === "public"){
                    isPublic = true;
                }
            }
        }

        console.log(isPublic);

        let articleToAdd = new Article(articleTitle, articleBody, isPublic, featured);
        articlesArray.push(articleToAdd);

        console.log("Added new article object to local articles array -> " + articlesArray.toString());

        let newArticle = createNewArticle(articleToAdd);

        if(articleToAdd.isPublic()){
            if(articleToAdd.featured){
                let badgeFeatured = document.createElement('span');
                badgeFeatured.className += "badge badge-secondary";
                badgeFeatured.textContent = "In primo piano";
                newArticle.prepend(badgeFeatured);
                publicArticlesElement.insertBefore(newArticle, publicArticlesElement.children[1]);
            } else {
                publicArticlesElement.appendChild(newArticle);
            }
        } else{
            draftArticlesElement.appendChild(newArticle);
        }

        if(publicArticlesElement.childNodes.length > 1){
            articlesContainer.appendChild(publicArticlesElement);
        }
        if(draftArticlesElement.childNodes.length > 1){
            articlesContainer.appendChild(draftArticlesElement);
        }

        $('#modal-add-article').modal('hide');

        window.scrollTo(0, newArticle.clientHeight + 15);
    });
});

function createNewArticle(articleObj){
    let articleElement = document.createElement('article');
    let articleCard = document.createElement('div');
    let articleTitle = document.createElement('h2');
    let articleBody = document.createElement('p');

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
    articleElement.appendChild(articleCard);

    return articleElement;
}
