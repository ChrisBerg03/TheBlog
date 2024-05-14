const main = document.getElementById("mainContainer");
const bearerToken = localStorage.getItem("token");
const urlParams = new URLSearchParams(window.location.search);
let postId;
postId = urlParams.get("id");
const url = `https://v2.api.noroff.dev/blog/posts/ChrisErBest/${postId}`;

async function displayPostFromUrl() {
    if (!postId) {
        alert("Post could not be found");
        return;
    }

    try {
        const response = await fetch(url);
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
            <img src="${mediaUrl}" alt="${mediaAlt}">
            <label for="title">Title</label>
            <input id="title" value="${title}"/>
            <label for="body">Story</label>
            <input id="body" value="${body}"/>
            <label for="tags">#Tags</label>
            <input id="tags" value="${tags}"/>
            <label for="mediaUrl">Media Url</label>
            <input id="mediaUrl" value="${mediaUrl}"/>
            <label for="mediaAlt">Media Alt</label>
            <input id="mediaAlt" value="${mediaAlt}"/>
            <p>Author: ${author}</p>
            <p>Created: ${created}</p>
            <p>Updated: ${updated}</p>
            <div id="buttonContainer">
            <button id="deletePost">Delete post</button>
            <button id="confirmEdit">Confirm changes</button>
            </div>
        </div>
    `;

    const deleteBTN = document.getElementById("deletePost");
    deleteBTN.addEventListener("click", async function () {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) {
            return;
        }

        if (!bearerToken) {
            alert("User not authenticated.");
            return;
        }

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            window.location.href = "/account/adminFeed.html";
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    });

    const confirmEdit = document.getElementById("confirmEdit");
    confirmEdit.addEventListener("click", editBlogPost);

    async function editBlogPost() {
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;
        const tags = document
            .getElementById("tags")
            .value.split(", ")
            .map((tag) => tag.trim());
        const mediaUrl = document.getElementById("mediaUrl").value;
        const mediaAlt = document.getElementById("mediaAlt").value;

        let postData = {
            title: title,
            body: body,
            tags: tags,
        };

        if (mediaUrl !== "") {
            postData.media = {
                url: mediaUrl,
                alt: mediaAlt,
            };
        }

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Failed to edit blog post");
            }

            const responseData = await response.json();
            window.location.href = "/account/adminFeed.html";
            return responseData;
        } catch (error) {
            console.error("Error editing blog post:", error.message);
            alert("An error occurred, please try again");
            return false;
        }
    }
}
