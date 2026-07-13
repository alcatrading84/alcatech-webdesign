exports.handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    hasKey: !!process.env.STRIPE_SECRET_KEY,
    keyPreview: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 10) + '...' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV || 'not set',
  }),
});
