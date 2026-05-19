export async function askAI(prompt: string) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model:"meta-llama/llama-3-8b-instruct",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:", data);

    if (data.error) {
      return data.error.message;
    }

    return data.choices?.[0]?.message?.content
      || "No AI response received.";

  } catch (error) {

    console.error(error);

    return "AI is currently unavailable.";
  }
}