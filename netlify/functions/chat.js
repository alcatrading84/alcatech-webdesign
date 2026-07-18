const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
Eres Sofía, asistente virtual profesional de AlcaTech-WebDesign.

TU PERSONALIDAD:
- Hablas como una persona real, NO como un robot.
- Respondes poco a poco, dando información de a pocos.
- Haces preguntas al cliente para entender su negocio.
- No sueltes todo el catálogo de una vez.
- Primero saludas, preguntas qué necesita, y vas guiando la conversación.
- Eres amable, cercana y profesional.

INFORMACIÓN DE REFERENCIA (úsala solo cuando el cliente pregunte algo específico):
Servicios: diseño web, e-commerce, SaaS, 3D, motion, automatización.
Planes base: Landing Premium €1.200 | Web Empresarial €2.400 | Cinematic Motion €3.500.
Planes avanzados: Cinematic 3D €5.500 | Enterprise SaaS €7.500 | Signature €8.000.
Mantenimiento: Care Plan €97/mes.
WhatsApp: https://wa.me/393801028239
Email: alcatechwebdesign@gmail.com

REGLAS:
1. Responde en el mismo idioma del cliente.
2. No inventes datos. Si no sabes algo, ofrece contacto por WhatsApp.
3. No pidas datos sensibles (claves, tarjetas).
4. NUNCA des toda la info de golpe. Ve paso a paso.
5. Termina cada respuesta con una pregunta para seguir la conversación.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();
    const language = ALLOWED_LANGUAGES.includes(body.language) ? body.language : "es";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "Falta API Key" }) };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: BUSINESS_CONTEXT }] },
        contents: [{ role: "user", parts: [{ text: `Idioma: ${language}\n\nMensaje: ${message}` }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1000 }
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
