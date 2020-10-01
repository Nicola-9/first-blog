// Comments script. This is a comments technology implementation
// without session storage

$(document).ready(function () {
    var commentsArray = [];

    if(sessionStorage.getItem("comments")){
        commentsArray = JSON.parse(sessionStorage.getItem("comments"));

        $('.comments-empty').remove();
        $('ul.comments-list').remove();
        let commentsList = '<ul class="comments-list"></ul>';
        $('#comments-div').append(commentsList);

        for(let i=0; i < commentsArray.length; i++){
            let elem = commentsArray[i];

            let comment = elem.comment;

            commentsList = $('ul.comments-list');

            if(comment.includes('@')){
                let initialStr = comment.substring(0, comment.indexOf('@'));
                let str = comment.substring(comment.indexOf('@'));
                console.log(str.indexOf(" "))
                let tagComment = str.indexOf(" ") < str.length ? str.substring(0, comment.indexOf(" ")) : str.substring(0);
    
                let newComment = '<li class="'+ elem.name.toLowerCase() +'"id="comment-item-' + (commentsArray.length + 1) +
                                '"><p class="comment">' +
                                    '<strong>' +
                                        elem.name + ':' +
                                    '</strong><br>' +
                                    initialStr + 
                                    '<a href="" class="link-comment">' + tagComment + '</a>' +
                                    tagComment;
                                '</p></li>';
    
                console.log(tagComment);
    
                commentsList.append(newComment);

                $(".link-comment").css({
                    "text-decoration:": "none"
                });

                $(".link-comment").click(() =>{
                    $('.' + tagComment.substring(1)).click({
                        "background-color": "#f4f4f4"
                    });
                });
            } else{
                let newComment = '<li class="'+ elem.name.toLowerCase() +'"id="comment-item-' + (commentsArray.length + 1) +
                '"><p class="comment">' +
                    '<strong>' +
                        elem.name + ':' +
                    '</strong><br>' +
                    comment +
                '</p></li>';
    
                commentsList.append(newComment);
            }

            let selectorItem = '#comment-item-' + (i + 1);

            $(selectorItem + ' .comment').css({
                'padding': '.5rem 0 .5rem 1%',
                "text-transform": "capitalize",
                "width": "45%",
                "display": "inline-block"
            });

            let divDateAndIdentifier = '<div id="date-identifier-' + (commentsArray.length + 1) + '"></div>';

            $('#comment-item-' + (commentsArray.length + 1)).append(divDateAndIdentifier);
            $('#date-identifier-' + (commentsArray.length + 1)).css({
                "text-align": "end",
                "display": "inline-block",
                "height": "100%",
                "width": "54.5%",
                'padding': '.5rem 0 .5rem 1%',
                "vertical-align": "top"
            });

            let date = new Date();

            let spanDate = '<span id="date-' + (commentsArray.length + 1) + '">' + date.toLocaleDateString() + ', ' +
                            date.getHours() + ":" + date.getMinutes() + '</span>' +
                            '<i class="like fa fa-thumbs-up" aria-hidden="true"></i>';
            let spanIdentifier = '<span>' + 
                                getThreeCharRandom() +  
                                '</span>' +
                                '<i class="unlike fa fa-thumbs-down" aria-hidden="true"></i>';

            $('#date-identifier-' + (commentsArray.length + 1)).append(spanDate);
            $('#date-identifier-' + (commentsArray.length + 1)).append(spanIdentifier);

            $('.like').css({
                "padding": "0",
                "margin-left": "1%",
                "color": "#c1c1c1"
            });

            $('.like').mouseover(() => {
                $('.like').css({
                    "color": "green",
                    "cursor": "pointer"
                });
            });

            $('.like').mouseout(() => {
                if(!($('like').data('clicked'))){
                    $('.like').css({
                        "color": "#c1c1c1",
                        "cursor": "default"
                    });
                }
            });

            $('.like').click(() => {
                $('.like').data('clicked', true);
                $('.like').css({
                    "color": "green"
                });
            });

            $('.unlike').css({
                "padding": "0",
                "margin-left": "1%",
                "color": "#c1c1c1"
            });

            $('.unlike').click(() => {
                $('.unlike').data('clicked', true);
                $('.unlike').css({
                    "color": "red"
                });
            });

            $('.unlike').mouseover(() => {
                $('.unlike').css({
                    "color": "red",
                    "cursor": "pointer"
                });
            });

            $('.unlike').mouseout(() => {
                if(!($('.unlike').data('clicked'))){
                    $('.unlike').css({
                        "color": "#c1c1c1",
                        "cursor": "default"
                    });
                }
            });

            $('#date-identifier-' + (commentsArray.length + 1) + ' span').css({
                "display": "inline-block",
                "width": "80%",
                "height": "50%",
                "font-size": "1rem",
            });
        }
    }

    $('.submit-comment').on('click', () => {
        let comment = $('.text-area-comment').val();
        let userNameComment = $('.name-comment-input').val();
        let commentsList;

        $('.text-area-comment').val("");
        $('.name-comment-input').val("");

        if (!commentsArray.length > 0) {
            commentsList = '<ul class="comments-list"></ul>';

            $('.comments-empty').remove();
            $('#comments-div').append(commentsList);
        }

        commentsList = $('ul.comments-list');

        if(comment.includes('@')){
            let initialStr = comment.substring(0, comment.indexOf('@'));
            let str = comment.substring(comment.indexOf('@'));
            let tagComment = str.indexOf(" ") < str.length ? str.substring(0, comment.indexOf(" ")) : str.substring(0);

            let newComment = '<li class="'+ userNameComment.toLowerCase() +'"id="comment-item-' + (commentsArray.length + 1) +
                            '"><p class="comment">' +
                                '<strong>' +
                                    userNameComment + ':' +
                                '</strong><br>' +
                                initialStr + 
                                '<a href="" class="link-comment">' + tagComment + '</a>' +
                                tagComment
                            '</p></li>';

            console.log(str);
            console.log(tagComment);

            commentsList.append(newComment);

            $(".link-comment").css({
                "text-decoration:": "none"
            });

            $(".link-comment").click(() =>{
                $('.' + tagComment.substring(1)).click({
                    "background-color": "#f4f4f4"
                });
            });
        } else{
            let newComment = '<li class="'+ userNameComment.toLowerCase() +'"id="comment-item-' + (commentsArray.length + 1) +
            '"><p class="comment">' +
                '<strong>' +
                    userNameComment + ':' +
                '</strong><br>' +
                comment +
            '</p></li>';

            commentsList.append(newComment);
        }

        let divDateAndIdentifier = '<div id="date-identifier-' + (commentsArray.length + 1) + '"></div>';

        $('#comment-item-' + (commentsArray.length + 1)).append(divDateAndIdentifier);
        $('#date-identifier-' + (commentsArray.length + 1)).css({
            "text-align": "end",
            "display": "inline-block",
            "height": "100%",
            "width": "54.5%",
            'padding': '.5rem 0 .5rem 1%',
            "vertical-align": "top"
        });

        let date = new Date();

        let spanDate = '<span id="date-' + (commentsArray.length + 1) + '">' + date.toLocaleDateString() + ', ' +
                        date.getHours() + ":" + date.getMinutes() + '</span>' +
                        '<i class="like fa fa-thumbs-up" aria-hidden="true"></i>';
        let spanIdentifier = '<span>' + 
                            getThreeCharRandom() +  
                            '</span>' +
                            '<i class="unlike fa fa-thumbs-down" aria-hidden="true"></i>';

        $('#date-identifier-' + (commentsArray.length + 1)).append(spanDate);
        $('#date-identifier-' + (commentsArray.length + 1)).append(spanIdentifier);

        $('.like').css({
            "padding": "0",
            "margin-left": "1%",
            "color": "#c1c1c1"
        });

        $('.like').mouseover(() => {
            $('.like').css({
                "color": "green",
                "cursor": "pointer"
            });
        });

        $('.like').mouseout(() => {
            if(!($('like').data('clicked'))){
                $('.like').css({
                    "color": "#c1c1c1",
                    "cursor": "default"
                });
            }
        });

        $('.like').click(() => {
            $('.like').data('clicked', true);
            $('.like').css({
                "color": "green"
            });
        });

        $('.unlike').css({
            "padding": "0",
            "margin-left": "1%",
            "color": "#c1c1c1"
        });

        $('.unlike').click(() => {
            $('.unlike').data('clicked', true);
            $('.unlike').css({
                "color": "red"
            });
        });

        $('.unlike').mouseover(() => {
            $('.unlike').css({
                "color": "red",
                "cursor": "pointer"
            });
        });

        $('.unlike').mouseout(() => {
            if(!($('.unlike').data('clicked'))){
                $('.unlike').css({
                    "color": "#c1c1c1",
                    "cursor": "default"
                });
            }
        });

        $('#date-identifier-' + (commentsArray.length + 1) + ' span').css({
            "display": "inline-block",
            "width": "80%",
            "height": "50%",
            "font-size": "1rem",
        });

        let selectorItem = '#comment-item-' + (commentsArray.length + 1);

        $(selectorItem + ' .comment').css({
            'padding': '.5rem 0 .5rem 1%',
            "text-transform": "capitalize",
            "width": "45%",
            "display": "inline-block"
        });

        $(selectorItem).css({
            "border-bottom": "1px solid #f4f4f4",
        });

        $(selectorItem).effect('highlight', { color: "#f4f4f4" }, 2500);

        let commentObj = {
            name: userNameComment, 
            comment: comment
        };

        console.log(commentsArray);

        commentsArray.push(commentObj);

        sessionStorage.clear();
        sessionStorage.setItem('comments', JSON.stringify(commentsArray));
    });
});

// Function to get a random ASCII value
function getThreeCharRandom(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz0123456789";
    
    let stringToReturn = characters.charAt(Math.floor(Math.random() * characters.length)) + 
                        characters.charAt(Math.floor(Math.random() * characters.length)) + 
                        characters.charAt(Math.floor(Math.random() * characters.length));

    return stringToReturn;
}