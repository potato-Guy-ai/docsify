const codeInput = document.querySelector("#code-input")
const generateBtn = document.querySelector("#generate-btn")
const docstringOutput = document.querySelector("#docstring-output")
const copyBtn = document.querySelector("#copy-btn")
const logoutBtn = document.querySelector("#logout-btn")

const hamburger = document.getElementById("hamburger")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")

const supabase = supabaseClient



// GENERATE DOCSTRING
generateBtn.addEventListener("click", generateDocstring)

async function generateDocstring() {

    const code = codeInput.value

    if (!code) {
        alert("Please paste Python code first.")
        return
    }

    generateBtn.classList.add("loading")
    generateBtn.textContent = "Generating..."

    try {

        const res = await fetch("/.netlify/functions/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        })

        const data = await res.json()

        const docstring = data.docstring

        docstringOutput.value = docstring


        // GET CURRENT USER
        const userId = localStorage.getItem("userId")

        const { history, error } = await supabaseClient
            .from("history")
            .insert([
                {
                    user_id: userId,
                    code_input: code,
                    generated_doc: docstring
                }
            ])

        if (error) {
            console.error("Supabase Insert Error:", error)
        }

    }
    catch (err) {
        console.error(err)
        alert("Something went wrong.")
    }
    generateBtn.classList.remove("loading")
    generateBtn.textContent = "Generate Docstring"

}



// COPY OUTPUT
copyBtn.addEventListener("click", () => {
    const text = docstringOutput.value
    if (!text) {
        alert("Nothing to copy")
        return
    }

    navigator.clipboard.writeText(text)
    copyBtn.textContent = "Copied!"
    setTimeout(() => {
        copyBtn.textContent = "Copy"
    }, 1500)

})



// SIDEBAR TOGGLE
hamburger.onclick = () => {

    sidebar.classList.add("active")
    overlay.classList.add("active")

}

overlay.onclick = () => {

    sidebar.classList.remove("active")
    overlay.classList.remove("active")

}



// LOGOUT
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")

    window.location.href = "login.html"

})