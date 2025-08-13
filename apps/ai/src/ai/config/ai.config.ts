import { registerAs } from '@nestjs/config';

export default registerAs('aiConfig', () => ({
  geminiApiKey: process.env.GEMINI_API_KEY, // camelCase is more standard in JS
}));
