import { z } from 'genkit';

export const CoverLetterSchema = z.object({
  jobTitle: z
    .string()
    .describe('The title of the job the user is applying for.'),
  companyName: z
    .string()
    .describe('The name of the company the user is applying for.'),
  jobDescription: z.string().describe('The job description.'),
  resumeData: z.string().describe("The user's resume data in JSON format."),
});
export type CoverLetter = z.infer<typeof CoverLetterSchema>;
