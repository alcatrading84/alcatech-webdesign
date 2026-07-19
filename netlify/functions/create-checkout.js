exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const { name, price, type } = JSON.parse(event.body || "{}");
    if (!name || !price) return { statusCode: 400, body: JSON.stringify({ error: "Faltan datos" }) };

    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) return { statusCode: 500, body: JSON.stringify({ error: "Stripe no configurado" }) };

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sk}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "mode": "payment",
        "success_url": "https://alcatechwebdesign.com?pago=ok",
        "cancel_url": "https://alcatechwebdesign.com?pago=cancel",
        "line_items[0][price_data][currency]": "eur",
        "line_items[0][price_data][product_data][name]": name,
        "line_items[0][price_data][unit_amount]": String(Math.round(price * 100)),
        "line_items[0][quantity]": "1"
      })
    });

    const data = await stripeRes.json();
    if (!stripeRes.ok) return { statusCode: 500, body: JSON.stringify({ error: data.error?.message || "Error Stripe" }) };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error de conexión" }) };
  }
};
