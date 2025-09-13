// api/analyze.js
export default async function handler(request, response) {
  const { text } = await request.json();

  // Replace with the URL of your Hugging Face Space for tone analysis.
  // The `/run/predict` endpoint is a standard for Gradio demos.
  const HUGGING_FACE_API_URL = "https://Tone_Analyser_backend.hf.space/run/predict";

  // This token is securely retrieved from Vercel's environment variables.
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
      // The `data` field contains an array of inputs, as expected by Gradio.
      body: JSON.stringify({ data: [text] })
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      throw new Error(`Hugging Face API responded with an error: ${hfResponse.status} - ${errorText}`);
    }

    // The response is an object with a `data` key, which is an array of results.
    const hfResult = await hfResponse.json();
    const [tone, confidence, oceanTraits] = hfResult.data;

    // We format the response to match what your frontend expects.
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