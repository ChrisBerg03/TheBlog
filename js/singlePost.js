const main = document.getElementById("mainContainer");

async function displayPostFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
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
    const id = blogItem.id;
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
            <h2>Title: ${title}</h2>
            <p>Story: ${body}</p>
            <p>Tags: ${tags}</p>
            <p>Author: ${author}</p>
            <p>Created: ${created}</p>
            <p>Updated: ${updated}</p>
        </div>
    `;
}
