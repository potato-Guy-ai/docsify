const Groq = require("groq-sdk")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

exports.handler = async function (event) {

    try {

        const body = JSON.parse(event.body)
        const code = body.code

        if (!code) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No code provided" })
            }
        }

        const completion = await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content: `You are a Python documentation generator.

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

        return {
            statusCode: 200,
            body: JSON.stringify({ docstring })
        }

    }
    catch (error) {
    console.error("ERROR:", error)

    return {
        statusCode: 500,
        body: JSON.stringify({
            error: error.message || "Generation failed"
        })
    }
}
