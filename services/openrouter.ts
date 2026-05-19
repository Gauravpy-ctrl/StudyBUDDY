export async function askAI(prompt: string) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,

          "HTTP-Referer": "https://yourstudybuddy-3f8o.vercel.app",

          "X-Title": "StudyBUDDY",
        },

        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",

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

    console.log(data);

    if (data.error) {
      return data.error.message;
    }

    return data.choices[0].message.content;

  } catch (error) {

    console.error(error);

    return "AI is currently unavailable.";

  }
}