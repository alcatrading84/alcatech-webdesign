exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ text: "test ok, key=" + (process.env.GEMINI_API_KEY ? "present" : "missing") })
  };
};