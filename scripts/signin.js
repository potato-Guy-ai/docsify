const userName = document.querySelector("#username");
const userMail = document.querySelector("#usermail");
const userPass = document.querySelector("#userpass");
const sumbitBtn = document.querySelector("#submit-btn")


sumbitBtn.addEventListener('click', ()=>{
    if(userPass.length < 10){
        alert("Password must be 10 characters")
    }
})
