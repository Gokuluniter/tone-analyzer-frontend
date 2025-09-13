// api/analyze.js
export default async function handler(request, response) {
  let text;
  
  // Use a more reliable method to parse the request body
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

  // Replace with the URL of your Hugging Face Space for tone analysis.
  const HUGGING_FACE_API_URL = "https://goks24-tone-analyser-backend.hf.space/run/predict";

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
      body: JSON.stringify({ data: [text] })
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      throw new Error(`Hugging Face API responded with an error: ${hfResponse.status} - ${errorText}`);
    }

    const hfResult = await hfResponse.json();
    const [tone, confidence, oceanTraits] = hfResult.data;

    response.status(200).json({
        tone: tone,
        confidence: confidence,
        oceanTraits: oceanTraits
    });

  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    response.status(500).json({ error: "Failed to analyze tone." });
  }
}

