import { registerAs } from '@nestjs/config';

export default registerAs('aiConfig', () => ({
  geminiApiKey: process.env.GEMINI_API_KEY,
  aiModel: process.env.AI_MODEL,
}));
