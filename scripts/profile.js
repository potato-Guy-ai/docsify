const displayName = document.querySelector("#display-name")
const email = document.querySelector("#email")
const joinDate = document.querySelector("#join-date")

const username = document.querySelector("#username")
const useremail = document.querySelector("#useremail")

const userId = localStorage.getItem("userId")

async function loadProfile() {

    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()

    if (error) {

        console.error(error)
        alert("Failed to load profile")
        return

    }

    // Fill profile data
    displayName.textContent = data.username
    email.textContent = data.email

    username.textContent = data.username
    useremail.textContent = data.email

    // Format join date
    const date = new Date(data.created_at)

    const formatted =
        date.toLocaleDateString()

    joinDate.textContent = "Joined: " + formatted

}

loadProfile()