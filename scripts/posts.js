/**
 * Base API URL for posts and comments
 */
const url = "https://jsonplaceholder.typicode.com/posts";

/**
 * Loading message element (shown before the post is loaded)
 */
const ephemeral = document.getElementById('ephemeral');

/**
 * Read query string parameters from the URL
 * Example: ?id=1
 */
const params = new URLSearchParams(window.location.search);
const Id = params.get('id');

/**
 * Hide loading message if a post ID is present
 */
if (Id) {
    ephemeral.classList.add('hidden');
}

/**
 * Main post container elements
 */
const post = document.getElementById("post");
const postContainer = document.getElementById('post-container');
const commentsContainer = document.getElementById('comments-container');

/**
 * Comment form elements
 */
const commentForm = document.getElementById('comment-form');
const emailInputForm = document.getElementById('email');
const commentTextAreaForm = document.getElementById('comment');

/**
 * Creates and appends a comment element to the given container
 *
 * @param {Object} comment - Comment object
 * @param {string} comment.email - Author email
 * @param {string} comment.body - Comment text
 * @param {HTMLElement} container - Container where the comment will be appended
 */
function createComment(comment, container) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    h3.innerHTML = comment.email;
    p.innerHTML = comment.body;

    div.appendChild(h3);
    div.appendChild(p);

    container.appendChild(div);
}

/**
 * Sends a new comment to the API and renders it on the page
 *
 * @param {string} comment - JSON string containing the comment data
 * @param {string} id - Post ID
 * @param {HTMLElement} container - Container where the new comment will be added
 */
async function postComment(comment, id, container) {
    const response = await fetch(`${url}/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: comment
    });

    const data = await response.json();
    createComment(data, container);
}

/**
 * Fetches a single post and its comments, then renders them on the page
 *
 * @param {string} url - Base API URL
 * @param {string} id - Post ID
 */
async function onePost(url, id) {

    // Fetch post and comments in parallel
    const [responsePost, responseComment] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ]);

    const dataPost = await responsePost.json();
    const dataComments = await responseComment.json();

    // Show post container
    post.classList.remove('hidden');

    // Create post elements
    const title = document.createElement('h2');
    const content = document.createElement('p');

    title.innerHTML = dataPost.title;
    content.innerHTML = dataPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(content);

    // Render comments
    dataComments.forEach((comment) => {
        createComment(comment, commentsContainer);
    });
}

/**
 * Handle comment form submission
 */
commentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Build comment object from form inputs
    let comment = {
        email: emailInputForm.value,
        body: commentTextAreaForm.value,
    };

    // Convert comment to JSON string
    comment = JSON.stringify(comment);

    // Send comment and append it to the list
    postComment(comment, Id, commentsContainer);
    emailInputForm.value = '';
    commentTextAreaForm.value = '';
});

/**
 * Initialize page by loading the post and its comments
 */
onePost(url, Id);
