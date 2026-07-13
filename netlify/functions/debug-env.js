exports.handler = async () => {
  const keys = Object.keys(process.env).sort();
  const stripeVars = keys.filter(k => k.toLowerCase().includes('stripe') || k.toLowerCase().includes('key'));
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      stripeKeyPrefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 8) : 'NOT SET',
      stripeKeyLength: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0,
      matchingKeys: stripeVars,
      totalEnvVars: keys.length,
      sampleKeys: keys.slice(0, 10),
    }),
  };
};
