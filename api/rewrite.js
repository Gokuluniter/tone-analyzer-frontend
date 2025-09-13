// api/rewrite.js
export default async function handler(request, response) {
  let text, tone;

  // Use a reliable method to parse the request body
  if (request.body) {
    try {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
      text = body.text;
      tone = body.tone;
    } catch (e) {
      return response.status(400).json({ error: "Invalid JSON in request body." });
    }
  }

  if (!text || !tone) {
    return response.status(400).json({ error: "Missing 'text' or 'tone' field in the request." });
  }

  // Replace with the URL of your Hugging Face Space for rewriting.
  const HUGGING_FACE_API_URL = "https://<your-rewriter-space>.hf.space/run/predict";

  const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

  if (!HUGGING_FACE_API_KEY) {
    return response.status(500).json({ error: "Hugging Face API key not configured." });
  }

  try {
    const hfResponse = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      // Pass both inputs (text and tone) in the `data` array.
      body: JSON.stringify({ data: [text, tone] })
    });

    if (!hfResponse.ok) {
        const errorText = await hfResponse.text();
        throw new Error(`Hugging Face API responded with an error: ${hfResponse.status} - ${errorText}`);
    }

    // The response contains the rewritten text as the first element of the `data` array.
    const hfResult = await hfResponse.json();
    const [rewrittenText] = hfResult.data;

    // We format the response to match what your frontend expects.
    response.status(200).json({ rewrittenText: rewrittenText });

  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    response.status(500).json({ error: "Failed to rewrite email." });
  }
}
