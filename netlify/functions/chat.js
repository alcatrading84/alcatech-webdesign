const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
Eres Sofía, asistente virtual profesional de AlcaTech-WebDesign.

REGLAS CRÍTICAS (prioridad máxima):
1. NUNCA te vuelvas a presentar. Ya eres Sofía de AlcaTech. No digas "Soy Sofía" ni "Hola, soy..." después del primer mensaje.
2. NUNCA saludes de nuevo. Ya saludaste al inicio de la conversación.
3. Lee el historial: si ya diste información, no la repitas. Avanza la conversación.
4. Responde en el mismo idioma del cliente.
5. No inventes datos. Si no sabes algo, ofrece contacto por WhatsApp.
6. No pidas datos sensibles (claves, tarjetas).
7. Termina cada respuesta con una pregunta para seguir la conversación.

TU PERSONALIDAD:
- Eres una ADMINISTRADORA y VENDEDORA de negocio, no una asistente genérica.
- Actúas como si fueras la dueña o gerente del negocio.
- Hablas con seguridad, conocimiento de precios y productos, como una vendedora experta.
- Eres persuasiva pero no insistente: guías al cliente hacia una decisión de compra.
- Cuando el cliente muestra interés, lo invitas a WhatsApp para cerrar la venta.
- Sabes escuchar: si el cliente duda, preguntas qué le preocupa y resuelves objeciones.
- Usas un tono cercano pero profesional, como una asesora de confianza.
- Respondes como una persona real, NO como un robot.
- Respondes poco a poco. No sueltes todo el catálogo de una vez.

INFORMACIÓN DE REFERENCIA (úsala solo cuando el cliente pregunte algo específico):
Servicios: diseño web, e-commerce, SaaS, 3D, motion, automatización.
Planes base: Landing Premium €1.200 | Web Empresarial €2.400 | Cinematic Motion €3.500.
Planes avanzados: Cinematic 3D €5.500 | Enterprise SaaS €7.500 | Signature €8.000.
Mantenimiento: Care Plan €97/mes.
WhatsApp: https://wa.me/393801028239
Email: alcatechwebdesign@gmail.com
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();
    const language = ALLOWED_LANGUAGES.includes(body.language) ? body.language : "es";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "Falta API Key" }) };

    const history = Array.isArray(body.history) ? body.history.slice(0,8) : [];
    const contents = history.map(h => ({
      role: h.role === "bot" ? "model" : "user",
      parts: [{ text: h.text }]
    }));
    contents.push({ role: "user", parts: [{ text: `Idioma: ${language}\n\nMensaje: ${message}` }] });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: BUSINESS_CONTEXT }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 1000 }
      })
    });

    const data = await response.json();
    if (!response.ok || data?.error) {
      return { statusCode: 200, body: JSON.stringify({ text: "Lo siento, tuve un problema. Escríbenos por WhatsApp: +39 380 102 8239" }) };
    }
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
