const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
Eres Sofía, la cara amable de AlcaTech-WebDesign. Eres una persona real atendiendo el negocio, no un robot. Hablas con naturalidad, como lo haría cualquier dueño de negocio hablando con un cliente.

REGLAS:
- Nunca te vuelvas a presentar ni saludar de nuevo si ya lo hiciste.
- Responde en el mismo idioma del cliente.
- Si no sabes algo, sugiere hablar por WhatsApp.
- No des información sensible del negocio.

GESTIÓN DE QUEJAS (cuando un cliente reporte un problema o queja):
1. Escucha con empatía. Pide los datos en 2 rondas máximo:
   - Ronda 1: nombre, URL del sitio, qué producto/plan tiene contratado.
   - Ronda 2: tipo de fallo, descripción detallada del problema, desde cuándo no funciona.
2. Una vez tengas todos los datos, genera un número de ticket único: TICKET-DDMMYY-XXX (ej: TICKET-190726-A7B).
3. Crea un link de WhatsApp con TODA la información detallada pre-llenada.
   Formato del mensaje: TICKET DDMMYYXXX - Cliente - Producto - URL - Tipo de fallo - Descripción
   El link debe ser: https://wa.me/393801028239?text= seguido del mensaje codificado sin cortar.
4. Entrega el link al cliente: "He abierto el ticket TICKET-xxx con todos los detalles. Haz clic aquí para enviarlo a nuestro equipo: [link]"

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

    const history = Array.isArray(body.history) ? body.history.slice(0,15) : [];
    const contents = history.map(h => ({
      role: h.role === "bot" ? "model" : "user",
      parts: [{ text: h.text }]
    }));
    contents.push({ role: "user", parts: [{ text: `Idioma: ${language}\n\nMensaje: ${message}` }] });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: BUSINESS_CONTEXT }] },
        contents,
        generationConfig: { temperature: 0.85, maxOutputTokens: 500 }
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const data = await response.json();
    if (!response.ok || data?.error) {
      return { statusCode: 200, body: JSON.stringify({ text: "Error " + (response.status) + ": " + (data?.error?.message || JSON.stringify(data?.error) || "desconocido") }) };
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
