const main = document.getElementById("mainContainer");

async function getFeed() {
    const response = await fetch(
        "https://v2.api.noroff.dev/blog/posts/ChrisErBest"
    );
    const blogPost = await response.json();
    console.log(blogPost);
}

getFeed();

function displayPosts() {
    main.innerHTML += `
    <a href="${}" class="posts">
    </img src="${}" alt="A blog image">
    <h3>${}</h3>
    <p>${}</p>
    </a>
    `;
}
