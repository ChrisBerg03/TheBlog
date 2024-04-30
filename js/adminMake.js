const main = document.getElementById("mainContainer");
const postBTN = document.getElementById("postBTN");
const bearerToken = localStorage.getItem("Token");

postBTN.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const tags = document.getElementById("tags").value;
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;

    const PostData = {
        title: title,
        body: body,
        tags: tags,
    };

    PostData.media = {
        url: mediaUrl,
        alt: mediaAlt,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
        },
        body: JSON.stringify(PostData),
    };

    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/blog/posts/ChrisErBest",
            requestOptions
        );

        if (!response.ok) {
            if (response.status === 400) {
                alert("An error has occurred. Please try again");
            } else {
                throw new Error("Error occurred");
            }
        }
        const data = await response.json();
        if (response.status === 201) {
            console.log("post successful", data);
            window.location.href = "/account/adminFeed.html";
        }
    } catch (error) {
        console.error("Login error:", error);
    }
});
