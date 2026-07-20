exports.handler = async (event) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: "Eres Sofia" }] },
        contents: [{ role: "user", parts: [{ text: "Hola" }] }],
        generationConfig: { temperature: 0.85, maxOutputTokens: 500 }
      })
    });
    const data = await resp.json();
    return { statusCode: 200, body: JSON.stringify({ text: "Status:" + resp.status + " " + JSON.stringify(data).substring(0, 300) }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ text: "Error: " + e.message }) };
  }
};