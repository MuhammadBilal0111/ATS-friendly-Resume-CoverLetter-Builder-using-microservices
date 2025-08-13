import { googleAI } from '@genkit-ai/googleai';
import { ConfigService } from '@nestjs/config';

// This function lets you build plugins after Nest has bootstrapped
export function createGenkitPlugins(configService: ConfigService) {
  const geminiApiKey = configService.get<string>('aiConfig.geminiApiKey');

  return [
    googleAI({
      apiKey: geminiApiKey,
    }),
  ];
}
