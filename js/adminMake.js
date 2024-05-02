const main = document.getElementById("mainContainer");
const bearerToken = localStorage.getItem("token");

async function createBlogPost(token) {
    const url = "https://v2.api.noroff.dev/blog/posts/ChrisErBest";

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const tags = document
        .getElementById("tags")
        .value.split(",")
        .map((tag) => tag.trim());
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
        alert("There has occurred an error, please try again");
        return false;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("postBTN").click();
    }
});

document.getElementById("postBTN").addEventListener("click", async () => {
    if (!bearerToken) {
        alert("You are not logged in. Please log in to create a blog post.");
        window.location.href = "/account/login.html";
    } else {
        const responseData = await createBlogPost(bearerToken);
        if (responseData !== false) {
            console.log("Blog post created successfully:", responseData);
        }
    }
});
