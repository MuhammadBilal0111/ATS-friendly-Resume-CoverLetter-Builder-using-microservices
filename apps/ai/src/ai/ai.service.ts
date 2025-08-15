// src/modules/ai/ai.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_AI_PROVIDER } from '@app/contracts';
import type { Genkit } from 'genkit';
import { optimizeResumeForATS } from './flows/optimize-resume-for-ats.flow';
import { generateCoverLetter } from './flows/generate-cover-letter.flow';

@Injectable()
export class AiService {
  constructor(@Inject(GEMINI_AI_PROVIDER) private readonly geminiAi: Genkit) {}

  public async optimizeResume(resume: any) {
    return await optimizeResumeForATS(this.geminiAi, resume);
  }

  public async createCoverLetter(coverLetter: any) {
    try {
      return await generateCoverLetter(this.geminiAi, coverLetter);
    } catch (error) {}
  }
}
