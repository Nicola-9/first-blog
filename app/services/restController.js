class RestController{
    constructor(){

    }

    getArticles(){
        var articlesArray = [];
    
        $.ajax({
            type: "GET",
            url: "https://texty-89895.firebaseio.com/posts.json",
            dataType: 'json',
            async: false,
            success: (data, response) =>{
                let booleanRisposta = response[0];
                        
                if(booleanRisposta){
                    for(let key in data){
                        let obj = data[key];
                    
                        articlesArray.push(
                            new Article(obj.title, obj.body, obj.public, obj.featured, obj.tag, key)
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
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(postArticle),
            dataType: 'json',
            async: false,
            success: (response) =>{
                console.log("Execution post request complete")
            }
        });
    }

    updateArticlePut(baseUrl, idObj, object){
        let apiUrl = baseUrl + idObj + ".json";

        $.ajax({
            type: 'PUT',
            url: apiUrl,
            contentType: 'application/json',
            data: JSON.stringify(object),
        }).done(function () {
            console.log('SUCCESS');
        });
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
        let apiUrl = baseUrl + idObj + ".json";

        $.ajax({
            type: "DELETE",
            url: apiUrl,
            dataType: 'json',
            async: false,
            success: (response) =>{
                console.log("Execution post request complete")
            }
        });
    }
}