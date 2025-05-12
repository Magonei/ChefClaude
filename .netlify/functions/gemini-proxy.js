// netlify/functions/gemini-proxy.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { ingredients } = JSON.parse(event.body);
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // ADD SYSTEM_PROMPT HERE
  const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page. Give the response in spanish
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${SYSTEM_PROMPT}\nI have ${ingredients}. Please give me a recipe!`
          }]
        }]
      })
    });
    
    // Add error handling for non-200 responses
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Add CORS header
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: err.message }) 
    };
  }
};