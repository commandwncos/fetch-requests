/**
 * Base API URL for retrieving posts
 */
const url = "https://jsonplaceholder.typicode.com/posts";

/**
 * Loading message element
 * Displayed while posts are being fetched
 */
const ephemeral = document.getElementById('ephemeral');

/**
 * Main container where post cards will be rendered
 */
const container = document.getElementById('container');

/**
 * Fetches all posts from the API and renders them as cards
 *
 * @param {string} url - Base API URL
 */
async function allPosts(url) {
    try {
        // Request all posts
        const response = await fetch(url);

        // Check for successful response
        if (response.status === 200) {

            // Hide loading message
            ephemeral.classList.add("hidden");

            // Parse response JSON
            const posts = await response.json();

            // Render each post as a card
            posts.forEach((post) => {

                // Create card elements
                const card = document.createElement('div');
                const title = document.createElement('h2');
                const content = document.createElement('p');
                const link = document.createElement('a');

                // Populate elements with post data
                title.innerHTML = post.title;
                content.innerHTML = post.body;

                // Create link to post details page
                link.innerHTML = 'Read';
                link.setAttribute('href', `posts.html?id=${post.id}`);

                // Assemble card structure
                card.appendChild(title);
                card.appendChild(content);
                card.appendChild(link);

                // Apply card styling class
                card.classList.add('card');

                // Append card to the main container
                container.appendChild(card);
            });

            return;
        }
    } catch (error) {
        // Log any network or runtime errors
        console.log(error);
    }
}

/**
 * Initialize page by loading all posts
 */
allPosts(url);
