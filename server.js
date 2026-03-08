import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: "AIzaSyDaafQ3mZpRUICAm_RrGw5TUTNdrGnAsgU" });

app.post("/generate", async (req, res) => {

    const { code } = req.body;

    const prompt = `
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

    Python Code:
    ${code}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    res.json({
        docstring: response.text
    });

});

app.listen(3000, () => {console.log("Server running on port 3000");});


