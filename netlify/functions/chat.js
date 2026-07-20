const https = require("https");

exports.handler = async (event) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: "Eres Sofia" }] },
      contents: [{ role: "user", parts: [{ text: "Hola" }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 500 }
    });

    const result = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "generativelanguage.googleapis.com",
        path: "/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        timeout: 8000
      }, res => {
        let data = "";
        res.on("data", c => data += c);
        res.on("end", () => resolve(data));
      });
      req.on("error", reject);
      req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
      req.write(body);
      req.end();
    });
    return { statusCode: 200, body: JSON.stringify({ text: result.substring(0, 300) }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ text: "Error: " + e.message }) };
  }
};