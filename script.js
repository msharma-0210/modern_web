const api_key = "AIzaSyBeAvvWfgXht48_zW6bGDieh5t0nLQhJAY";

async function generate() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt) {
    alert("Please enter prompt");
    return;
  }

  const fullPrompt = `
Generate HTML code with inline CSS for webpage on "${prompt}"

Rules:
- Output only HTML
- Include <html>, <head>, <body>
- Use modern styling
- Responsive design
`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": api_key
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    const output =
      data.candidates[0].content.parts[0].text;

    document.getElementById("result").textContent = output;

  } catch (error) {
    console.error(error);
    alert("Error generating code");
  }
}




// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: AIzaSyBeAvvWfgXht48_zW6bGDieh5t0nLQhJAY' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'