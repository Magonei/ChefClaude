import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

// Add fetch polyfill if needed (Node.js <18)
// import fetch from 'node-fetch'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Give the response in spanish
`

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}

// HuggingFace integration
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)
console.log(hf)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

// --- Gemini API Integration ---
export async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY // Set this in your environment variables
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    const body = {
        contents: [
            {
                parts: [
                    { text: `${SYSTEM_PROMPT}\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                ]
            }
        ]
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        // Gemini responses are in data.candidates[0].content.parts[0].text
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini"
    } catch (err) {
        console.error(err.message)
        return "Error contacting Gemini API"
    }
}