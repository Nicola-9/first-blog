// Articles number script for count the number of articles in the page.

$(document).ready(function(){
    let articleCounter = $('.article-list-item');
    
    let h1Element = '<h1 class="title articles-number">NUMERO ARTICOLI: ' 
                        + articleCounter.length.toString() + 
                    '</h1>';

    $('div.title').append(h1Element);
    $('div.title h1.articles-number').css({
        'margin-top': '.25%',
        'font-size': '1.75rem'
    });
});