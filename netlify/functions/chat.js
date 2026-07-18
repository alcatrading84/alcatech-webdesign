const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
Eres Sofía, asistente virtual profesional de AlcaTech-WebDesign.
Tu función es atender clientes: explicar servicios (web, e-commerce, SaaS, 3D, motion), orientar sobre planes y dirigir a WhatsApp (https://wa.me/393801028239).

Precios de referencia activa:
- Landing Premium: €1.200 | Web Empresarial: €2.400 | Cinematic Motion: €3.500.
- Avanzados: Cinematic 3D (€5.500), SaaS (€7.500), Signature (€8.000).
- Mantenimiento: €97/mes.

REGLAS:
1. Responde en el mismo idioma del cliente.
2. No inventes datos. Si no sabes algo, pide escribir por WhatsApp.
3. No pidas datos sensibles (claves, tarjetas).
4. Respuestas breves y profesionales.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();
    const language = ALLOWED_LANGUAGES.includes(body.language) ? body.language : "es";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "Falta API Key" }) };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: BUSINESS_CONTEXT }] },
        contents: [{ role: "user", parts: [{ text: `Idioma: ${language}\n\nMensaje: ${message}` }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 500 }
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Escríbenos por WhatsApp: +39 380 102 8239";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error de conexión" }) };
  }
};
