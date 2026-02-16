import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Aurevia's expert jewelry consultant and personal stylist.
Aurevia is a high-end luxury brand specializing in gold and diamond jewelry.
Your tone should be elegant, sophisticated, helpful, and concise.

Context about current featured products:
${MOCK_PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description} Price starts at ${p.price}`).join('\n')}

If a user asks about prices, refer to the mock data.
If a user asks for styling advice, offer suggestions based on occasion (wedding, gala, daily wear).
Keep responses under 50 words unless detailed advice is requested.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I apologize, I'm having trouble connecting to our styling database right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm currently unable to process your request. Please try again later.";
  }
};