require('dotenv').config();

const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-2.0-flash-exp',
  'gemini-pro'
];

async function callGemini(prompt, systemInstruction = '', clientApiKey = null) {
  const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      isOffline: true,
      error: 'No Gemini API key provided. Operating in Offline Study Mode.',
    };
  }

  // Attempt with primary models
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: systemInstruction ? `${systemInstruction}\n\nTask: ${prompt}` : prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Gemini model ${model} failed:`, errorData?.error?.message || response.statusText);
        // If 403 (invalid key / leaked), don't keep trying all models
        if (response.status === 403 || response.status === 400) {
          return {
            success: false,
            isOffline: true,
            error: errorData?.error?.message || 'Invalid or revoked Gemini API Key.',
          };
        }
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return {
          success: true,
          isOffline: false,
          model,
          text
        };
      }
    } catch (err) {
      console.warn(`Error querying Gemini (${model}):`, err.message);
    }
  }

  return {
    success: false,
    isOffline: true,
    error: 'Gemini API unreachable. Falling back to Offline Study Mode.',
  };
}

module.exports = { callGemini };
