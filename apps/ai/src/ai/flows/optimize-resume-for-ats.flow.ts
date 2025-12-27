import { genkit } from 'genkit';
import { loadPrompt } from '../utils/loadPrompts';
import { PROMPTS_FILE_PATH } from '../constants/prompts-file-path';
import { HttpStatus } from '@nestjs/common';
import { AppRpcException } from '@app/common';
import {
  OptimizeResumeInputSchema,
  ResumeSchema,
} from '../schemas/resume.schema';

// Define the ATS Optimization Flow
export const defineOptimizeResumeFlow = (ai: ReturnType<typeof genkit>) => {
  let atsPromptText: string | null = null;

  return ai.defineFlow(
    {
      name: 'OptimizeResumeFlow',
      inputSchema: OptimizeResumeInputSchema,
      outputSchema: ResumeSchema,
    },
    async (input) => {
      try {
        // Load prompt lazily (only once)
        if (!atsPromptText) {
          atsPromptText = await loadPrompt(
            PROMPTS_FILE_PATH.RESUME_ATS_OPTIMIZATION_PROMPT_FILE_PATH,
          );
        }

        // Construct the prompt dynamically
        const prompt = atsPromptText
          .replace('{{{jobDescription}}}', input.jobDescription || '')
          .replace('{{{json resume}}}', JSON.stringify(input.resume, null, 2));

        // Generate structured output from AI
        const { output } = await ai.generate({
          prompt,
          output: { schema: ResumeSchema },
        });

        if (!output) {
          throw new AppRpcException(
            'Failed to optimize resume for ATS',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return output;
      } catch (error) {
        throw new AppRpcException(
          'Error optimizing resume for ATS',
          error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          error?.message || String(error),
        );
      }
    },
  );
};
