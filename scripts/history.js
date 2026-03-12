const historyContainer = document.querySelector("#history-container")
const logoutBtn = document.querySelector("#logout-btn")

const userId = localStorage.getItem("userId")


// LOGOUT
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")

    window.location.href = "login.html"

})


// LOAD HISTORY
async function loadHistory() {

    const { data, error } = await supabaseClient
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

    if (error) {

        console.error(error)
        return

    }

    // NO HISTORY
    if (!data || data.length === 0) {

        historyContainer.innerHTML = `
        <div class="empty-card">
        Start generating docstrings <br><br>
        Your generated docstrings will appear here.
        </div>
        `
        return
    }

    // HISTORY EXISTS
    renderHistory(data)

}

function renderHistory(history) {

    historyContainer.innerHTML = ""
    history.forEach(item => {

        const date = new Date(item.created_at)
        const formattedTime = date.toLocaleDateString() + " | " + date.toLocaleTimeString()

        const box = document.createElement("div")
        box.classList.add("history-box")

        box.innerHTML = `
        
        <div class="history-header">
        <span class="timestamp">${formattedTime}</span>
        </div>

        <p class="label">Code</p>
        <pre class="code-input">${item.code_input}</pre>

        <p class="label">Generated Docstring</p>
        <pre class="generated-doc">${item.generated_doc}</pre>

        <div class="history-actions">
        <button class="copy-doc">Copy Docstring</button>
        <button class="delete-box">Delete</button>
        </div>

        `

        // COPY BUTTON
        box.querySelector(".copy-doc").addEventListener("click", () => {

            navigator.clipboard.writeText(item.generated_doc)
            box.querySelector(".copy-doc").textContent = "Copied!"

            setTimeout(() => {
                box.querySelector(".copy-doc").textContent = "Copy Docstring"
            }, 1500)

        })

        // DELETE BUTTON
        box.querySelector(".delete-box").addEventListener("click", () => {
            deleteHistory(item.id)
        })
        historyContainer.appendChild(box)
    })

}



async function deleteHistory(id) {

    const confirmDelete = confirm("Delete this history item?")

    if (!confirmDelete) return

    const { data, error } = await supabaseClient
        .from("history")
        .delete()
        .eq("id", String(id))

    if (error) {

        console.error(error)
        alert("Delete failed")
        return

    }
    loadHistory()

}



// INITIAL LOAD
loadHistory()