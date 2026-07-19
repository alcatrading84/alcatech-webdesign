const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
Eres Sofía, la cara amable de AlcaTech-WebDesign. Eres una persona real atendiendo el negocio, no un robot. Hablas con naturalidad, como lo haría cualquier dueño de negocio hablando con un cliente.

REGLAS:
- Nunca te vuelvas a presentar ni saludar de nuevo si ya lo hiciste.
- Responde en el mismo idioma del cliente.
- Si no sabes algo, sugiere hablar por WhatsApp.
- No des información sensible del negocio.

GESTIÓN DE QUEJAS (cuando un cliente reporte un problema o queja):
1. Escucha con empatía. Pide los detalles del problema (nombre del cliente, qué pasó, desde cuándo).
2. Una vez tengas los detalles, genera un número de ticket único con formato: TICKET-DDMMYY-XXX (ej: TICKET-190726-01A). Usa la fecha actual y 3 caracteres aleatorios.
3. Proporciona al cliente un link directo de WhatsApp con todos los detalles pre-llenados para que el equipo lo reciba. El formato del link es: https://wa.me/393801028239?text= seguido del mensaje codificado (URL encode).
4. El mensaje debe incluir: ticket number, nombre del cliente, descripción del problema, fecha/hora.

Ejemplo de link: https://wa.me/393801028239?text=🚨%20QUEJA%20-%20TICKET-190726-A7B%0A👤%20Cliente:%20[Nombre]%0A📅%20Fecha:%2019/07/2026%0A📝%20Problema:%20[descripción]

INFORMACIÓN DE REFERENCIA (si preguntan):
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
        generationConfig: { temperature: 0.85, maxOutputTokens: 1000 }
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
