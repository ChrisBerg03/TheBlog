const main = document.getElementById("mainContainer");
const createPost = document.getElementById("newPostBTN");
const publicPage = document.getElementById("publicPageBTN");

publicPage.addEventListener("click", function () {
    window.location.href = "/index.html";
});

createPost.addEventListener("click", function () {
    window.location.href = "/post/make.html";
});

async function getFeed() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("User not authenticated.");
        window.location.href = "/account/login.html";
        return;
    }

    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/blog/posts/ChrisErBest",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const blogPosts = await response.json();
        displayPosts(blogPosts.data);
    } catch (error) {
        alert("Error getting data, please try again");
    }
}

getFeed();

function displayPosts(data) {
    data.forEach((blogItem) => {
        const id = blogItem.id;
        const title = blogItem.title;
        const author = blogItem.author.name;
        const body = blogItem.body;
        const tags = blogItem.tags;
        const media = blogItem.media;
        let mediaUrl = "";
        let mediaAlt = "";
        if (media !== null) {
            mediaUrl = media.url;
            mediaAlt = media.alt;
        }
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

        main.innerHTML += `
        <div class="postContainer">
            <a href="/post/index.html?id=${id}" class="posts">
            <img src="${mediaUrl}" alt="${mediaAlt}">
            <h2>${title}</h2>
            <p>${id}</p>
            <p>${body}</p>
            <p>${tags}</p>
            <p>${author}</p>
            <p>Created: ${created}</p>
            <p>Updated: ${updated}</p>
            </a>
            <button class="postEdit" data-id="${id}">Edit</button>
            </div>
        `;
    });

    const editBTN = document.querySelectorAll(".postEdit");
    editBTN.forEach((button) => {
        button.addEventListener("click", function () {
            const postId = this.getAttribute("data-id");
            window.location.href = `/post/edit.html?id=${postId}`;
        });
    });
}
