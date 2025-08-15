import { loadPrompt } from '../utils/loadPrompts';
import { PROMPTS_FILE_PATH } from '../constants/prompts-file-path';
import { ResumeSchema } from '../schemas/resume.schema';
import { z, type Genkit } from 'genkit';

// Input Schema
export const OptimizeResumeForATSInputSchema = z.object({
  resume: ResumeSchema,
  jobDescription: z
    .string()
    .optional()
    .describe('The full job description the user is applying for.'),
});

// Types
export type OptimizeResumeForATSInput = z.infer<
  typeof OptimizeResumeForATSInputSchema
>;
export type OptimizeResumeForATSOutput = z.infer<typeof ResumeSchema>;

// Load prompt lazily
let atsPromptText: string | null = null;

export async function optimizeResumeForATS(
  ai: Genkit, // Pass in the injected AI instance
  input: OptimizeResumeForATSInput,
): Promise<OptimizeResumeForATSOutput> {
  if (!atsPromptText) {
    atsPromptText = await loadPrompt(
      PROMPTS_FILE_PATH.RESUME_ATS_OPTIMIZATION_PROMPT_FILE_PATH,
    );
  }

  // Define the prompt
  const prompt = ai.definePrompt({
    name: 'optimizeResumePrompt',
    input: { schema: OptimizeResumeForATSInputSchema },
    output: { schema: ResumeSchema },
    prompt: atsPromptText,
  });

  // Define the flow
  const optimizeResumeFlow = ai.defineFlow(
    {
      name: 'optimizeResumeFlow',
      inputSchema: OptimizeResumeForATSInputSchema,
      outputSchema: ResumeSchema,
    },
    async (flowInput) => {
      const { output } = await prompt(flowInput);
      if (!output) throw new Error('Failed to optimize resume');
      return output;
    },
  );

  return optimizeResumeFlow(input);
}
