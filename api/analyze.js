// api/analyze.js
export default async function handler(request, response) {
  let text;
  
  if (request.body) {
    try {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
      text = body.text;
    } catch (e) {
      return response.status(400).json({ error: "Invalid JSON in request body." });
    }
  }

  if (!text) {
    return response.status(400).json({ error: "Missing 'text' field in the request." });
  }

  // The URL now points to the /analyze endpoint defined in your app.py
  const HUGGING_FACE_API_URL = "https://goks24-tone-analyser-backend.hf.space/analyze";

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
      // app.py expects a JSON object with a 'text' field
      body: JSON.stringify({ text: text })
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      throw new Error(`Hugging Face API responded with an error: ${hfResponse.status} - ${errorText}`);
    }

    // The response is a single JSON object, so no need to access the `data` field.
    const hfResult = await hfResponse.json();

    response.status(200).json(hfResult);

  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    response.status(500).json({ error: "Failed to analyze tone." });
  }
}
