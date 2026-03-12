const loginForm = document.querySelector("#login-form")
const userMail = document.querySelector("#usermail")
const userPass = document.querySelector("#userpass")

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault()

    const email = userMail.value
    const pass = userPass.value

    try {

        const { data, error } = await supabaseClient
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", pass)
            .limit(1)

        if (error) {
            console.error(error)
            alert("Login error")
            return
        }

        if (data.length > 0) {

            const user = data[0]

            localStorage.setItem("loggedIn", "true")
            localStorage.setItem("userId", user.id)
            localStorage.setItem("userEmail", user.email)

            window.location.href = "generator.html"

        } else {

            alert("Invalid Email or Password")

        }

    } catch (err) {

        console.error(err)
        alert("Something went wrong")

    }

})