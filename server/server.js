import express from "express"
import cors from "cors"
import Groq from "groq-sdk"

import { config } from "./config.js"


const app = express()

app.use(cors())
app.use(express.json())

const groq = new Groq({
    apiKey: config.groqKey
})


app.post("/generate", async (req, res) => {

    try{

        const { code } = req.body

        if(!code){
            return res.status(400).json({
                error:"No code provided"
            })
        }

        const completion = await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [

                {
                    role: "system",
                    content: `
You are a Python documentation generator.

TASK:
Generate a clean Python docstring for the given function.

RULES:
- Output ONLY the docstring
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include the function code
- Return only the triple quoted docstring

Example Output:
"""
Summary of function.

Args:
    param (type): description

Returns:
    type: description
"""
                    `
                },

                {
                    role: "user",
                    content: `Python Code:\n${code}`
                }

            ],

            temperature: 0.2,
            max_tokens: 300

        })


        const docstring = completion.choices[0].message.content.trim()

        res.json({
            docstring: docstring
        })

    }
    catch(error){

        console.error(error)

        res.status(500).json({
            error:"Failed to generate docstring"
        })

    }

})


const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`)

})