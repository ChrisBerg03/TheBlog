const main = document.getElementById("mainContainer");
let postId;

async function displayPostFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("id"); // Assign value to postId

    if (!postId) {
        alert("Post could not be found");
        return;
    }

    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/blog/posts/ChrisErBest/${postId}`
        );
        const blogPost = await response.json();

        displayPost(blogPost.data);
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}

displayPostFromUrl();

function displayPost(blogItem) {
    const title = blogItem.title;
    const author = blogItem.author.name;
    const body = blogItem.body;
    const tags = blogItem.tags.join(", ");
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

    main.innerHTML = `
        <div class="postContainer">
            <div id="imageDiv">
            <img src="${mediaUrl}" alt="${mediaAlt}">
            <input id="imgUrl" value="${mediaUrl}"/>
            <input id="imgAlt" value="${mediaAlt}"/>
            </div>
            <input id="title" value="${title}"/>
            <input id="body" value="${body}"/>
            <input id="tags" value="${tags}"/>
            <p>Author: ${author}</p>
            <p>Created: ${created}</p>
            <p>Updated: ${updated}</p>
            <button id="deletePost">Delete post</button>
        </div>
    `;
    const deleteBTN = document.getElementById("deletePost");
    deleteBTN.addEventListener("click", async function () {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) {
            return;
        }

        const bearerToken = localStorage.getItem("token");
        if (!bearerToken) {
            alert("User not authenticated.");
            return;
        }

        try {
            const response = await fetch(
                `https://v2.api.noroff.dev/blog/posts/ChrisErBest/${postId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${bearerToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete post");
            } else {
                window.location.href = "/account/adminFeed.html";
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    });
}
