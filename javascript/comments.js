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

            commentsList = $('ul.comments-list');

            let newComment = '<li id="comment-item-' + (i + 1) +
                                '"><p class="comment">' +
                                    '<strong>' +
                                        elem.name + ':' +
                                    '</strong><br>' +
                                    elem.comment +
                                '</p></li>';
        
            commentsList.append(newComment);
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

        let newComment = '<li id="comment-item-' + (commentsArray.length + 1) +
                            '"><p class="comment">' +
                                '<strong>' +
                                    userNameComment + ':' +
                                '</strong><br>' +
                                comment +
                            '</p></li>';

        commentsList.append(newComment);

        let selectorItem = '#comment-item-' + (commentsArray.length + 1);

        $(selectorItem + ' .comment').css({
            'padding': '.5rem 0 .5rem 1%',
            "border-bottom": "1px solid #f4f4f4",
            "text-transform": "capitalize"
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