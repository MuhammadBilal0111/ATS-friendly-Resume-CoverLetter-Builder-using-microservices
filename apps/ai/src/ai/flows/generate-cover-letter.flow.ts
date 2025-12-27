import { genkit } from 'genkit';
import { loadPrompt } from '../utils/loadPrompts';
import { PROMPTS_FILE_PATH } from '../constants/prompts-file-path';
import { HttpStatus } from '@nestjs/common';
import { AppRpcException } from '@app/common';
import {
  CoverLetterInputSchema,
  CoverLetterOutputSchema,
} from '../schemas/cover-letter.schema';

// Define the Cover Letter Generation Flow
export const defineCoverLetterFlow = (ai: ReturnType<typeof genkit>) => {
  let coverLetterPromptText: string | null = null;

  return ai.defineFlow(
    {
      name: 'CoverLetterGeneratorFlow',
      inputSchema: CoverLetterInputSchema,
      outputSchema: CoverLetterOutputSchema,
    },
    async (input) => {
      try {
        // Load prompt only once
        if (!coverLetterPromptText) {
          coverLetterPromptText = await loadPrompt(
            PROMPTS_FILE_PATH.COVER_LETTER_PROMPT_FILE_PATH,
          );
        }

        // Dynamic prompt construction
        const prompt = coverLetterPromptText
          .replace('{{{jobTitle}}}', input.jobTitle)
          .replace('{{{companyName}}}', input.companyName)
          .replace('{{{jobDescription}}}', input.jobDescription)
          .replace('{{{json resume}}}', JSON.stringify(input.resume, null, 2));

        // Generate structured output
        const { output } = await ai.generate({
          prompt,
          output: { schema: CoverLetterOutputSchema },
        });

        if (!output) {
          throw new AppRpcException(
            'Failed to generate cover letter',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return output;
      } catch (error) {
        throw new AppRpcException(
          'Error generating cover letter',
          error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          error?.message || String(error),
        );
      }
    },
  );
};
