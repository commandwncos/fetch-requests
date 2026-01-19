
---

# 📘 Fetch API – Posts & Comments Demo

This project is a **vanilla JavaScript application** that demonstrates how to use the **Fetch API** to retrieve and send data from a REST API.
It consumes the public API **JSONPlaceholder** to display posts and comments, simulating a simple blog.

The project is intentionally built **without frameworks** to focus on:

* understanding `fetch`
* async/await
* DOM manipulation
* basic frontend architecture

---

## 🧠 What this project demonstrates

* Fetching a **list of posts**
* Fetching **a single post with its comments**
* Sending data using **POST requests**
* Rendering API data dynamically in the DOM
* Handling query parameters (`URLSearchParams`)
* Basic loading state handling
* Clean separation between pages

---

## 🗂️ Project Structure

```text
/
├── main.html          # Home page (list of posts)
├── posts.html         # Post details page (single post + comments)
│
├── css/
│   ├── main.css       # Styles for main.html
│   └── posts.css      # Styles for posts.html
│
├── scripts/
│   ├── main.js        # Fetches and renders all posts
│   └── posts.js       # Fetches one post, comments, and handles form
│
└── README.md
```

---

## 🌐 API Used

This project uses the public API:

```
https://jsonplaceholder.typicode.com
```

Endpoints used:

* `GET /posts`
* `GET /posts/:id`
* `GET /posts/:id/comments`
* `POST /posts/:id/comments`

> ⚠️ JSONPlaceholder is a **fake API**.
> POST requests simulate success but do not persist data.

---

## 🏠 main.html – Fetching all posts

On the home page, the app fetches all posts and displays them as cards.

### Key concepts used:

* `fetch()`
* `async / await`
* DOM creation
* Dynamic links with query parameters

### Example (simplified):

```js
const response = await fetch(url);
const posts = await response.json();

posts.forEach(post => {
    // create card elements
});
```

Each post card links to:

```
posts.html?id=<postId>
```

---

## 📰 posts.html – Fetching a single post and comments

On the post details page, the app:

1. Reads the post ID from the URL
2. Fetches the post and comments **in parallel**
3. Renders the content dynamically

### Reading URL parameters:

```js
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
```

### Fetching post and comments together:

```js
const [postResponse, commentsResponse] = await Promise.all([
    fetch(`${url}/${id}`),
    fetch(`${url}/${id}/comments`)
]);
```

This improves performance and keeps the code clean.

---

## 💬 Posting a comment (POST request)

The comment form sends data using a `POST` request.

### Example:

```js
await fetch(`${url}/${id}/comments`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
});
```

After the request succeeds, the new comment is rendered immediately in the UI.

---

## ⏳ Loading State

A simple loading message is shown while data is being fetched:

```html
<p id="ephemeral">Loading...</p>
```

When data is ready, the message is hidden via JavaScript.

---

## 🎨 Styling

* Apple-inspired **dark glassmorphism UI**
* Pure CSS (no libraries)
* Responsive grid layout
* Reusable components (cards, comments)

---

## 🚀 How to run the project

Because this project uses `fetch`, you should run it from a local server.

### Option 1 – VS Code Live Server

* Install **Live Server**
* Right-click `main.html`
* Click **Open with Live Server**

### Option 2 – Simple HTTP server

```bash
npx serve
```

or

```bash
python -m http.server
```

Then open:

```
http://localhost:3000
```

(or the port shown in the terminal)

---

## 🎯 Learning goals

This project is ideal if you want to learn:

* How the Fetch API works
* How to consume REST APIs
* How to structure a small frontend project
* How to work without frameworks
* How to handle async data in the browser

---

## 📌 Future improvements (optional)

* Error handling UI
* Loading skeletons
* Pagination
* Refactor to classes or modules
* Replace fake API with a real backend

---

## 📄 License

This project is for **learning and demonstration purposes**.

---
