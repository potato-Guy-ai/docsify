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


const clearHistoryBtn = document.querySelector(".clear-history")

clearHistoryBtn.addEventListener("click", () => {

const confirmClear = confirm("Are you sure you want to clear history?")

if(confirmClear){

localStorage.removeItem("history")

alert("History cleared")

}

})


const deleteAccountBtn = document.querySelector(".delete-account")

deleteAccountBtn.addEventListener("click", () => {

const confirmDelete = confirm("This will permanently delete your account.")

if(confirmDelete){

localStorage.clear()

alert("Account deleted")

window.location.href = "signin.html"

}

})


const changePasswordBtn = document.querySelector(".change-password")

changePasswordBtn.addEventListener("click", () => {

alert("Password change feature coming soon.")

})