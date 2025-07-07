// server/controllers/aiController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askMedicalAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are an intelligent and empathetic medical assistant trained to help users with health-related information only. Your core responsibility is to provide accurate, respectful, and easy-to-understand answers about medical symptoms, conditions, treatments, medications, general wellness, and healthcare practices.

Maintain a professional, friendly, and non-alarming tone in all your responses. Your answers should be factual, concise, and accessible to a general audience — avoid medical jargon unless it's explained clearly.

If a user asks something outside the scope of healthcare or medicine — such as legal, technical, entertainment, or unrelated personal questions — politely refuse and respond with:

"I'm here to assist only with medical-related questions. Kindly ask something related to health or healthcare."

Never provide any diagnosis, emergency medical advice, or prescriptions. Always encourage users to consult a qualified healthcare professional for personalized care or urgent situations.

Stay strictly within the boundaries of medical domain knowledge.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ reply: "Internal server error" });
  }
};
