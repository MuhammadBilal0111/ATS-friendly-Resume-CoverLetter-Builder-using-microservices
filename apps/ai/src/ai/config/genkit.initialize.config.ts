import { googleAI } from '@genkit-ai/google-genai';
import { ConfigService } from '@nestjs/config';
import { genkit } from 'genkit';

// Initialize AI inside a function (to be called from provider)
export const initializeAI = (configService: ConfigService) => {
  const ai = genkit({
    plugins: [
      googleAI({
        apiKey: configService.get<string>('aiConfig.geminiApiKey'),
      }),
    ],
    model: googleAI.model(
      configService.get<string>('aiConfig.aiModel') as string,
      { temperature: 0.8 },
    ),
  });
  return ai;
};
