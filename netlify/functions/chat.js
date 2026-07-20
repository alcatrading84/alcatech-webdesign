const https = require("https");

const ALLOWED_LANGUAGES = ["es", "en", "it", "de", "fr"];

const BUSINESS_CONTEXT = `
## IDENTIDAD
Eres Sofía, la cara amable de AlcaTech-WebDesign. Eres una persona real atendiendo el negocio, no un robot. Hablas con naturalidad, como lo haría cualquier dueño de negocio hablando con un cliente.

## REGLAS (prioridad estricta)
1. Nunca te vuelvas a presentar ni saludar de nuevo si ya lo hiciste.
2. Responde en el mismo idioma del cliente.
3. Si es queja → seguir protocolo TICKET
4. Si es venta → presentar planes según presupuesto
5. Si no sabes algo → sugiere hablar por WhatsApp

## PROTOCOLO TICKET (quejas)
Paso 1: Escucha con empatía. Pide nombre, URL del sitio, qué producto/plan tiene contratado.
Paso 2: Pide tipo de fallo, descripción detallada, desde cuándo no funciona.
Paso 3: Genera TICKET-DDMMYY-XXX (ej: TICKET-190726-A7B).
Paso 4: Crea link WhatsApp: https://wa.me/393801028239?text= con TODOS los datos del ticket.
Paso 5: Entrega: "He abierto el ticket TICKET-xxx. Haz clic aquí: [link]"

## DATOS
Servicios: diseño web, e-commerce, SaaS, 3D, motion, automatización.
Planes: Landing Premium €1.200 | Web Empresarial €2.400 | Cinematic Motion €3.500
Planes avanzados: Cinematic 3D €5.500 | Enterprise SaaS €7.500 | Signature €8.000
Mantenimiento: Care Plan €97/mes
WhatsApp: https://wa.me/393801028239
Email: alcatechwebdesign@gmail.com
`;

function openaiFetch(apiKey, messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "gpt-5.6",
      messages,
      temperature: 0.3,
      max_tokens: 500
    });
    const req = https.request({
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      timeout: 15000
    }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve(JSON.parse(data)));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.write(body);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();
    const language = ALLOWED_LANGUAGES.includes(body.language) ? body.language : "es";

    const history = Array.isArray(body.history) ? body.history.slice(0, 15) : [];
    const messages = [{ role: "system", content: BUSINESS_CONTEXT }];
    for (const h of history) {
      messages.push({ role: h.role === "bot" ? "assistant" : "user", content: h.text });
    }
    messages.push({ role: "user", content: `[Idioma: ${language}] ${message}` });

    const data = await openaiFetch(process.env.OPENAI_API_KEY, messages);

    if (data?.error) {
      return { statusCode: 200, body: JSON.stringify({ text: "Lo siento, tuve un problema. Escríbenos por WhatsApp: +39 380 102 8239" }) };
    }
    const text = data?.choices?.[0]?.message?.content || "Escríbenos por WhatsApp: +39 380 102 8239";
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) };
  } catch (error) {
    return { statusCode: 200, body: JSON.stringify({ text: "Lo siento, tuve un problema. Escríbenos por WhatsApp: +39 380 102 8239" }) };
  }
};