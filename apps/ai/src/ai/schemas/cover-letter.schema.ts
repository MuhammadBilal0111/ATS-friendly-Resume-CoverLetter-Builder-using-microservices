import { z } from 'genkit';
import { ResumeSchema } from './resume.schema';

// Define input schema for generating a cover letter
export const CoverLetterInputSchema = z.object({
  jobTitle: z
    .string()
    .describe('The title of the job the user is applying for.'),
  companyName: z
    .string()
    .describe('The name of the company the user is applying for.'),
  jobDescription: z.string().describe('The job description.'),
  resume: ResumeSchema.describe("The user's resume data."),
});
// Define output schema for generating a cover letter
export const CoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type CoverLetterInput = z.infer<typeof CoverLetterInputSchema>;
export type CoverLetterOutput = z.infer<typeof CoverLetterOutputSchema>;
