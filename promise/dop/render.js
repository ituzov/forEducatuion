const createPost = (titlePost, textPost) => {

    const post = document.createElement('div');
    post.id = 'post';
    post.className = 'post';

    const postTitle = document.createElement('h1');
    postTitle.className = 'post__title';
    postTitle.innerText = titlePost;

    const postText = document.createElement('p');
    postText.className = 'post__text';
    postText.innerText = textPost;

    const commentsTitle = document.createElement('b');
    commentsTitle.className = 'post__comments-text';
    commentsTitle.innerText = 'Комментарии';

    const postCommentsDiv = document.createElement('div');
    postCommentsDiv.className = 'post__comments';

    post.append(postTitle, postText, commentsTitle, postCommentsDiv);

    return post

}


const addComment = (userEmail, textComment) =>{

    const comment = document.createElement('div');
    comment.className = 'post-comment';

    const postCommentAuthor = document.createElement('span');
    postCommentAuthor.className = 'post-comment__author';
    postCommentAuthor.innerText = userEmail;

    const postCommentText = document.createElement('span')
    postCommentText.className = 'post-comment__text';
    postCommentText.innerText = textComment;

    comment.append(postCommentAuthor, postCommentText);

    return comment

}


const renderPost = async (postId) =>{

    const responsePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postData = await responsePost.json();
    document.querySelector('body').append(createPost(postData.title, postData.body));

    const responseComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const commentsData = await responseComments.json();

    const commentsDiv = document.querySelector('.post__comments');

    commentsData.forEach(item => {
        commentsDiv.append(addComment(item['email'],item['body']));
    });

}

renderPost(5);