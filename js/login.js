const main = document.getElementById("mainContainer");
const signInBTN = document.getElementById("signIn");

signInBTN.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    };

    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/auth/login",
            requestOptions
        );

        if (!response.ok) {
            if (response.status === 400) {
                alert("Please enter a valid email");
            } else if (response.status === 401) {
                alert("Incorrect email or password. Please try again.");
            } else {
                throw new Error("Failed to login"); // Handle other error responses
            }
        }
        const data = await response.json();
        if (response.status === 200) {
            console.log("Login successful", data);
            window.location.href = "/post/index.html";
        }
    } catch (error) {
        // Handle errors
        console.error("Login error:", error);
    }
});
