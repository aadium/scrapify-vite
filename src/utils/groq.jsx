import Groq from "groq-sdk";

export const requestGroqAi = async (content) => {
    const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API,
        dangerouslyAllowBrowser: true
    });
    const reply = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: content
        }],
        model: "llama3-8b-8192"
    });
    return reply.choices[0].message.content;
}