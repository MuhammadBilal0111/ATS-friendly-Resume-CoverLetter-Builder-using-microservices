// src/ai/genkit/index.ts
import { genkit } from 'genkit';

const model = process.env.AI_MODEL || 'googleai/gemini-2.0-flash';

export const ai = genkit({
  plugins: genkitPlugins,
  model,
});
