const isLoggedIn = localStorage.getItem("loggedIn")

if (isLoggedIn !== "true") {
    window.location.href = "login.html"
}