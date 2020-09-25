// Comments script. This is a comments technology implementation
// without session storage

$(document).ready(function () {
    let commentsArray = [];

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

        commentsArray.push(comment);
    });
});