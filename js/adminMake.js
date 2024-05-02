const main = document.getElementById("mainContainer");
const bearerToken = localStorage.getItem("Token");

async function createBlogPost(token) {
    const url = "https://v2.api.noroff.dev/blog/posts/ChrisErBest";

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const tags = document
        .getElementById("tags")
        .value.split(",")
        .map((tag) => tag.trim()); // Split tags by comma and trim whitespace
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;

    const postData = {
        title: title,
        body: body,
        tags: tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt,
        },
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error("Failed to create blog post");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error creating blog post:", error.message);
        // You can handle the error here, such as displaying a message to the user
    }
}

// Example usage with bearer token:
const authToken = localStorage.getItem("Token");

// Call createBlogPost function when submitting a form or performing an action
// For example, when submitting a form:
document.getElementById("postBTN").addEventListener("click", async () => {
    const responseData = await createBlogPost(authToken);
    console.log("Blog post created successfully:", responseData);
});
