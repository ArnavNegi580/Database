const blogContainer = document.getElementById("blog-container");

async function fetchBlogs() {
    try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const blogs = await response.json();

        blogContainer.innerHTML = "";

        blogs.forEach(blog => {
            blogContainer.innerHTML += `
                <div class="blog-card">
                    <img src="${blog.image}" alt="${blog.title}">

                    <div class="blog-info">
                        <span>${blog.category}</span>

                        <h2>${blog.title}</h2>

                        <p>${blog.description}</p>

                        <p>By ${blog.author}</p>

                        <button onclick="viewBlog('${blog._id}')">
                            Read More
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}

fetchBlogs();