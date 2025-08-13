import { ai } from '../genkit/index';
import { loadPrompt } from '../utils/loadPrompts';
import { PROMPTS } from '../constants/prompts-file';
import { CoverLetterSchema } from '../schemas/cover-letter.schema';
import { z } from 'genkit';

// Input schema
const CoverLetterInputSchema = z.object({
  coverLetter: CoverLetterSchema,
});

// Output schema
const CoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});

// Types
export type CoverLetterInput = z.infer<typeof CoverLetterInputSchema>;
export type CoverLetterOutput = z.infer<typeof CoverLetterOutputSchema>;

// Lazy-loaded prompt text
let coverLetterPromptText: string | null = null;

export async function generateCoverLetter(
  input: CoverLetterInput,
): Promise<CoverLetterOutput> {
  // Load the prompt file only once
  if (!coverLetterPromptText) {
    coverLetterPromptText = await loadPrompt(PROMPTS.COVER_LETTER);
  }

  // Define the prompt
  const prompt = ai.definePrompt({
    name: 'generateCoverLetterPrompt',
    input: { schema: CoverLetterInputSchema },
    output: { schema: CoverLetterOutputSchema },
    prompt: coverLetterPromptText,
  });

  // Define the flow
  const generateCoverLetterFlow = ai.defineFlow(
    {
      name: 'generateCoverLetterFlow',
      inputSchema: CoverLetterInputSchema,
      outputSchema: CoverLetterOutputSchema,
    },
    async (flowInput) => {
      const { output } = await prompt(flowInput);
      if (!output) throw new Error('Failed to generate cover letter');
      return output;
    },
  );

  // Run the flow
  return generateCoverLetterFlow(input);
}
