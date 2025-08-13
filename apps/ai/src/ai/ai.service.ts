// src/modules/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { optimizeResumeForATS } from './flows/optimize-resume-for-ats.flow';
import { generateCoverLetter } from './flows/generate-cover-letter.flow';

@Injectable()
export class AiService {
  public async optimizeResume(resume: any) {
    return optimizeResumeForATS(resume);
  }

  public async createCoverLetter(coverLetter: any) {
    return generateCoverLetter(coverLetter);
  }
}
