const https = require("https");

function openaiFetch(key, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key
      },
      timeout: 10000
    }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve(JSON.parse(data)));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.write(JSON.stringify(body));
    req.end();
  });
}

exports.handler = async (event) => {
  const key = process.env.OPENAI_API_KEY;
  const prefix = key ? key.substring(0, 8) + "..." : "MISSING";

  const data = await openaiFetch(key, {
    model: "gpt-5.6",
    messages: [{ role: "user", content: "Hola" }],
    max_tokens: 50
  });

  const txt = data?.choices?.[0]?.message?.content || (data?.error?.message || JSON.stringify(data));
  return { statusCode: 200, body: JSON.stringify({ text: "Key=" + prefix + " " + txt.substring(0, 200) }) };
};