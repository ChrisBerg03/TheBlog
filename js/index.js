const main = document.getElementById("mainContainer");

async function getFeed() {
    const response = await fetch(
        "https://v2.api.noroff.dev/blog/posts/ChrisErBest"
    );
    const blogPost = await response.json();
    displayPosts(blogPost.data);
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
            <a href="/post/index.html?id=${id}" class="posts">
            <img src="${mediaUrl}" alt="${mediaAlt}">
            <h2>${title}</h2>
            <p>${body}</p>
            <p>${tags}</p>
            <p>${author}</p>
            <p>Created: ${created}</p>
            <p>Updated: ${updated}</p>
            </a>
        `;
    });
}
