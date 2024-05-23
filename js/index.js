const main = document.getElementById("mainContainer");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

const postsPerPage = 12;
let currentPage = 1;
let totalPages = 1;
let blogPosts = [];

async function fetchPosts() {
    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/blog/posts/ChrisErBest"
        );
        const blogPost = await response.json();
        return blogPost.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        alert("There was an error fetching posts. Please try again later.");
        return [];
    }
}

function renderPosts(posts, page) {
    main.innerHTML = "";
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    let postsHTML = "";
    paginatedPosts.forEach((blogItem) => {
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

        postsHTML += `
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

    main.innerHTML = postsHTML;
}

function renderPaginationControls() {
    footer.innerHTML = `
    <div class="paginationControls">
        <button id="prevPage">Previous</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button id="nextPage">Next</button>
    </div>
    `;

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts(blogPosts, currentPage);
            updatePaginationText();
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts(blogPosts, currentPage);
            updatePaginationText();
        }
    });
}

function updatePaginationText() {
    const paginationText = document.querySelector(".paginationControls span");
    paginationText.textContent = `Page ${currentPage} of ${totalPages}`;
}

async function displayPosts() {
    blogPosts = await fetchPosts();
    totalPages = Math.ceil(blogPosts.length / postsPerPage);

    renderPosts(blogPosts, currentPage);
    renderPaginationControls();

    blogPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
    const newPosts = blogPosts.slice(0, 3);

    const carouselPosts = newPosts.map((blogItem) => {
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
            <div class="positionContainer">
                <button id="prevBtn">&#8656</button>
                <div class="carouselSlide">
                    ${carouselPosts.join("")}
                </div>
                <button id="nextBtn">&#8658</button>
            </div>
        </div>
    `;

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carouselPostsElements = document.querySelectorAll(".newPosts");

    let currentSlide = 0;

    const showSlide = () => {
        carouselPostsElements.forEach((post, index) => {
            post.style.display = index === currentSlide ? "block" : "none";
        });
    };

    prevBtn.addEventListener("click", () => {
        currentSlide =
            currentSlide > 0
                ? currentSlide - 1
                : carouselPostsElements.length - 1;
        showSlide();
    });

    nextBtn.addEventListener("click", () => {
        currentSlide =
            currentSlide < carouselPostsElements.length - 1
                ? currentSlide + 1
                : 0;
        showSlide();
    });

    showSlide();
}

displayPosts();
