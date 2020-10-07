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
                    for(let i in data){
                        let obj = data[i];
    
                        articlesArray.push(
                            new Article(obj.title, obj.body, obj.public, obj.featured, obj.tag)
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

    patchArticle(){

    }

    deleteArticle(url, postArticle){
        $.ajax({
            type: "DELETE",
            url: url,
            data: JSON.stringify(postArticle),
            dataType: 'json',
            async: false,
            success: (response) =>{
                console.log("Execution post request complete")
            }
        });
    }
}