const blogDetails = document.getElementById("blog-details");

const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

async function fetchBlogDetails() {
    try {
        if (!blogId) {
            blogDetails.innerHTML = "<h2>Blog ID missing</h2>";
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/blogs/${blogId}`
        );

        if (!response.ok) {
            throw new Error("Blog not found");
        }

        const blog = await response.json();

        blogDetails.innerHTML = `
            <article class="single-blog">

                <img src="${blog.image}" alt="${blog.title}">

                <h1>${blog.title}</h1>

                <p class="category">${blog.category}</p>

                <p>Written by ${blog.author}</p>

                <p>${new Date(blog.createdAt).toLocaleDateString()}</p>

                <h3>${blog.description}</h3>

                <div class="blog-content">
                    ${blog.content}
                </div>

            </article>
        `;

    } catch (error) {
        blogDetails.innerHTML = "<h2>Unable to load blog.</h2>";
        console.error(error);
    }
}

fetchBlogDetails();