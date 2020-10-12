class RestController{
    constructor(){

    }

    getArticles(){
        var articlesArray = [];
    
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articles",
            dataType: 'json',
            async: false,
            success: (data, response) =>{
                let booleanRisposta = response[0];
                let respArray = data.data;

                if(booleanRisposta){
                    for(let i=0; i < respArray.length; i++){
                        let obj = respArray[i];
                        console.log(obj);
                    
                        articlesArray.push(
                            new Article(obj.title, obj.bodyText, obj.public, obj.featured, obj.tags, obj._id)
                        );
                    }
                } else{
                    console.log("ERROR");
                }
            }
        });
    
        console.log(articlesArray);
    
        return articlesArray;
    }

    postArticle(url, postArticle){
        let articleId = null;

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(postArticle),
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: (data, response) =>{
                console.log("Execution post request complete");
                articleId = data.data.name;
            }
        });

        return articleId;
    }

    updateArticlePut(baseUrl, idObj, object){
        let apiUrl = baseUrl + idObj + ".json";
        let articleId = null;

        $.ajax({
            type: 'PUT',
            url: apiUrl,
            contentType: 'application/json',
            data: JSON.stringify(object),
        }).done(function () {
            console.log('SUCCESS');
            articleId = data.name;
        });

        return articleId;
    }

    updateArticlePatch(baseUrl, idObj, object){
        let apiUrl = baseUrl + idObj + ".json";

        $.ajax({
            type: 'PATCH',
            url: apiUrl,
            contentType: 'application/json',
            data: JSON.stringify(object),
        }).done(function () {
            console.log('SUCCESS');
        });
    }

    deleteArticle(baseUrl, idObj){
        let apiUrl = baseUrl + idObj;

        $.ajax({
            type: "DELETE",
            url: apiUrl,
            dataType: 'json',
            async: false,
            success: (response) =>{
                console.log("Execution delete request complete")
            }
        });
    }
}