const form = document.querySelector("#signup-form")

form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.querySelector('#username').value
    const email = document.querySelector("#usermail").value
    const password = document.querySelector("#userpass").value

    const { data, error } = await supabaseClient
        .from("users")
        .insert([
            {
                username: name,
                email: email,
                password: password
            }
        ])

    if (error) {

        alert("Signup failed")

    } else {

        alert("Account created successfully")
        window.location.href = "login.html"

    }

})