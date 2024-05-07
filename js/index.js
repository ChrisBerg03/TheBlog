const main = document.getElementById("mainContainer");
const header = document.querySelector("header");

async function displayPosts() {
    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/blog/posts/ChrisErBest"
        );
        const blogPost = await response.json();

        blogPost.data.sort((a, b) => new Date(b.created) - new Date(a.created));

        // Generate HTML for all posts in the main container
        const postsHTML = blogPost.data.map((blogItem) => {
            const id = blogItem.id;
            const title = blogItem.title;
            const author = blogItem.author.name;
            const body = blogItem.body;
            const tags = blogItem.tags;
            const media = blogItem.media;
            const mediaUrl = media ? media.url : "";
            const mediaAlt = media ? media.alt : "";
            const created = new Date(blogItem.created).toLocaleString("NO", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });
            const updated = new Date(blogItem.updated).toLocaleString("NO", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });

            return `
                <div id="post-${id}" class="post">
                    <a href="/post/index.html?id=${id}" class="posts">
                        <img src="${mediaUrl}" alt="${mediaAlt}">
                        <h2>${title}</h2>
                        <p>${body}</p>
                        <p>${tags}</p>
                        <p>${author}</p>
                        <p>Created: ${created}</p>
                        <p>Updated: ${updated}</p>
                    </a>
                </div>
            `;
        });

        main.innerHTML = postsHTML.join("");

        // Generate HTML for the carousel with only one post displayed at a time
        const carouselPosts = blogPost.data.map((blogItem) => {
            const id = blogItem.id;
            const title = blogItem.title;
            const media = blogItem.media;
            const mediaUrl = media ? media.url : "";
            const mediaAlt = media ? media.alt : "";
            const created = new Date(blogItem.created).toLocaleString("NO", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });

            return `
                <a id="carouselPost-${id}" href="/post/index.html?id=${id}" class="newPosts" style="display: none;">
                    <img src="${mediaUrl}" alt="${mediaAlt}">
                    <h2>${title}</h2>
                    <p>Created: ${created}</p>
                </a>
            `;
        });

        header.innerHTML = `
            <div class="carouselContainer">
                <button id="prevBtn">Prev</button>
                <div class="carouselSlide">
                    ${carouselPosts.join("")}
                </div>
                <button id="nextBtn">Next</button>
            </div>
        `;

        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        let currentSlide = 0;

        const showSlide = () => {
            const posts = document.querySelectorAll(".newPosts");
            posts.forEach((post, index) => {
                if (index === currentSlide) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });
        };

        prevBtn.addEventListener("click", () => {
            if (currentSlide > 0) {
                currentSlide -= 1;
            } else {
                currentSlide = 2;
            }
            showSlide();
        });

        nextBtn.addEventListener("click", () => {
            if (currentSlide < carouselPosts.length - 1) {
                currentSlide += 1;
            } else {
                currentSlide = 0;
            }
            showSlide();
        });
        showSlide();
    } catch (error) {
        console.error("Error fetching and displaying posts:", error);
        alert("There was an error fetching posts. Please try again later.");
    }
}

displayPosts();
