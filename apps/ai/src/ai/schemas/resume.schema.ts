import { z } from 'genkit';

const PersonalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  linkedin: z.string(),
  github: z.string(),
  portfolio: z.string(),
});

const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  points: z.array(z.string()),
});

const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  gpa: z.string(),
});

const ProjectSchema = z.object({
  name: z.string(),
  technologies: z.string(),
  link: z.string(),
  liveLink: z.optional(z.string()),
  points: z.array(z.string()),
});

const SkillSchema = z.object({
  name: z.string(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
});

const CertificationSchema = z.object({
  name: z.string(),
  issuingBody: z.string(),
  date: z.string(),
  link: z.string(),
});

const TemplateSchema = z.object({
  id: z.string(),
  headingColor: z.string(),
});
export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  summary: z
    .string()
    .describe("A 1-3 sentence summary of the user's professional experience."),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
  skills: z.array(SkillSchema),
  certifications: z.array(CertificationSchema),
  template: TemplateSchema,
});
export type Resume = z.infer<typeof ResumeSchema>;
