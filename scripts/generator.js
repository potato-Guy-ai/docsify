

const codeInput = document.querySelector("#code-input")
const generateBtn = document.querySelector("#generate-btn")
const docstringOutput = document.querySelector("#docstring-output")
const outputBtn = document.querySelector("#copy-btn")

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");


generateBtn.addEventListener("click", generateDocstring);


outputBtn.addEventListener('click', ()=>{

})

hamburger.onclick = () => {
sidebar.classList.add("active");
overlay.classList.add("active");
};

overlay.onclick = () => {
sidebar.classList.remove("active");
overlay.classList.remove("active");
};


btn.addEventListener("click", generateDocstring);

async function generateDocstring(){
    const code = document.getElementById("code-input").value;

    if(!code){
        alert("Please paste Python code first.");
        return;
    }

    btn.classList.add("loading");
    btnText.textContent = "Generating...";
    try{

        const res = await fetch("http://localhost:3000/generate",{
            method:"POST",
            headers:{
            "Content-Type":"application/json"},
            body:JSON.stringify({code})
        });

        const data = await res.json();
        document.getElementById("docstring-output").value = data.docstring;
    }
    catch(err){
        alert("Something went wrong.");
    }

    btn.classList.remove("loading");
    btnText.textContent = "Generate Docstring";

}