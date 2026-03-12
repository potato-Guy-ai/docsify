const logoutBtn = document.querySelector("#logout-btn")

const changePasswordBtn = document.querySelector(".change-password")
const deleteAccountBtn = document.querySelector(".delete-account")
const clearHistoryBtn = document.querySelector(".clear-history")

const passwordModal = document.querySelector("#password-modal")
const deleteModal = document.querySelector("#delete-modal")

const cancelPass = document.querySelector("#cancel-pass")
const updatePass = document.querySelector("#update-pass")

const cancelDelete = document.querySelector("#cancel-delete")
const confirmDelete = document.querySelector("#confirm-delete")

const oldPassInput = document.querySelector("#old-pass")
const newPassInput = document.querySelector("#new-pass")

const userId = localStorage.getItem("userId")



/* ---------------- THEME ---------------- */

const themeRadios = document.querySelectorAll('input[name="theme"]')

themeRadios.forEach(radio => {

radio.addEventListener("change", () => {

if(radio.value === "light"){

document.body.classList.add("light-theme")
localStorage.setItem("theme","light")

}else{

document.body.classList.remove("light-theme")
localStorage.setItem("theme","dark")

}

})

})


const savedTheme = localStorage.getItem("theme")

if(savedTheme === "light"){

document.body.classList.add("light-theme")
document.querySelector('input[value="light"]').checked = true

}else{

document.querySelector('input[value="dark"]').checked = true

}



/* ---------------- CHANGE PASSWORD ---------------- */

changePasswordBtn.addEventListener("click", () => {
    passwordModal.classList.add("show")
})


cancelPass.addEventListener("click", () => {
    passwordModal.classList.remove("show")
})


updatePass.addEventListener("click", async () => {

    const oldPassword = oldPassInput.value
    const newPassword = newPassInput.value

    if(!oldPassword || !newPassword){
    alert("Please fill all fields")
    return
    }

    const { data, error } = await supabaseClient
    .from("users")
    .select("password")
    .eq("id", userId)
    .single()

    if(error){
        alert("Error checking password")
        return
    }

    if(data.password !== oldPassword){
        alert("Old password incorrect")
        return
    }

    const { error:updateError } = await supabaseClient
    .from("users")
    .update({ password:newPassword })
    .eq("id", userId)

    if(updateError){
        alert("Password update failed")
        return
    }
    alert("Password updated successfully")
    passwordModal.classList.remove("show")
    oldPassInput.value = ""
    newPassInput.value = ""

})



/* ---------------- CLEAR HISTORY ---------------- */

clearHistoryBtn.addEventListener("click", async () => {
    const confirmClear = confirm("Clear all your generation history?")

    if(!confirmClear) return

    await supabaseClient
    .from("history")
    .delete()
    .eq("user_id", userId)

    alert("History cleared")

})



/* ---------------- DELETE ACCOUNT ---------------- */

deleteAccountBtn.addEventListener("click", () => {
    deleteModal.classList.add("show")
})


cancelDelete.addEventListener("click", () => {
    deleteModal.classList.remove("show")
})


confirmDelete.addEventListener("click", async () => {

    const { error } = await supabaseClient
    .from("users")
    .delete()
    .eq("id", userId)

    if(error){
        alert("Account deletion failed")
        return
    }

    localStorage.clear()
    alert("Account deleted")
    window.location.href = "signin.html"

})



/* ---------------- LOGOUT ---------------- */

logoutBtn.addEventListener("click", ()=>{

localStorage.removeItem("loggedIn")
localStorage.removeItem("userId")
localStorage.removeItem("userEmail")

window.location.href = "login.html"

})