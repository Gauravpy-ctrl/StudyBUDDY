export async function askAI(prompt: string) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",

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

    if (!data.choices) {
      return "OpenRouter API Error";
    }

    return data.choices[0].message.content;

  } catch (error) {

    console.error(error);

    return "AI is currently unavailable.";

  }
}export async function askAI(prompt: string) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",

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

    return data.choices[0].message.content;

  } catch (error) {

    console.error(error);

    return "AI is currently unavailable.";

  }
}