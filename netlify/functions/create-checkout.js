const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const { planId, planName, planPrice, planPriceRange, locale } = JSON.parse(event.body);

    const priceMap = {
      'landing': 20000,
      'empresarial': 50000,
      'cinematografico': 120000,
      'portal': 250000,
    };

    const currencyMap = { es: 'eur', en: 'usd', it: 'eur', de: 'eur', fr: 'eur' };
    const currency = currencyMap[locale] || 'eur';
    const amount = priceMap[planId] || 20000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: planName,
            description: `${planName} — ${planPriceRange || planPrice}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://alcatech-webdesign.netlify.app/?success=true&plan=${planId}`,
      cancel_url: `https://alcatech-webdesign.netlify.app/?canceled=true`,
      locale: locale === 'es' ? 'es' : locale === 'it' ? 'it' : locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
