// api/rewrite.js
export default async function handler(request, response) {
  let text, tone;

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

  // The URL now points to the /rewrite endpoint defined in your app.py
  const HUGGING_FACE_API_URL = "https://goks24-tone-analyser-backend.hf.space/rewrite";

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
      body: JSON.stringify({ text: text, tone: tone })
    });

    if (!hfResponse.ok) {
        const errorText = await hfResponse.text();
        throw new Error(`Hugging Face API responded with an error: ${hfResponse.status} - ${errorText}`);
    }

    // The response from app.py is a single JSON object
    const hfResult = await hfResponse.json();
    const rewrittenText = hfResult.rewrittenText;

    response.status(200).json({ rewrittenText: rewrittenText });

  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    response.status(500).json({ error: "Failed to rewrite email." });
  }
}
