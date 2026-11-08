import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('EXPO_PUBLIC_GEMINI_API_KEY is not set — add it to .env.local');
}

export const gemini = new GoogleGenAI({ apiKey });

export async function askGemini(prompt: string): Promise<string> {
  const response = await gemini.models.generateContent({
    model: 'gemini-flash-latest',
    contents: prompt,
  });
  return response.text ?? '';
}
