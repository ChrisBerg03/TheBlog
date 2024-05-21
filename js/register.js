const main = document.getElementById("mainContainer");
const registerBTN = document.getElementById("register");

function validateImageFields(avatarUrl, avatarAlt, bannerUrl, bannerAlt) {
    if ((!avatarUrl || !avatarAlt) && (!bannerUrl || !bannerAlt)) {
        return false;
    }
    return true;
}

registerBTN.addEventListener("click", async () => {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const bio = document.getElementById("bio").value;
    const avatarUrl = document.getElementById("avatarUrl").value;
    const avatarAlt = document.getElementById("avatarAlt").value;
    const bannerUrl = document.getElementById("bannerUrl").value;
    const bannerAlt = document.getElementById("bannerAlt").value;

    const requestBody = {
        name: name,
        email: email,
        password: password,
        bio: bio,
    };
    const confirmed = confirm("Is the given information correct?");
    if (!confirmed) {
        return;
    }
    if (validateImageFields(avatarUrl, avatarAlt, bannerUrl, bannerAlt)) {
        if (avatarUrl && avatarAlt) {
            requestBody.avatar = {
                url: avatarUrl,
                alt: avatarAlt,
            };
        }

        if (bannerUrl && bannerAlt) {
            requestBody.banner = {
                url: bannerUrl,
                alt: bannerAlt,
            };
        }
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/auth/register",
            requestOptions
        );

        if (!response.ok) {
            if (response.status === 400) {
                alert("Please enter a valid email");
            } else {
                throw new Error("Failed to register");
            }
        }
        const data = await response.json();
        if (response.status === 201) {
            console.log("Registration successful", data);
            window.location.href = "/account/login.html";
        }
    } catch (error) {
        console.error("Login error:", error);
    }
});
