import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GEMINI_AI_PROVIDER } from '@app/contracts';
import type { Genkit } from 'genkit';
import { optimizeResumeForATS } from './flows/optimize-resume-for-ats.flow';
import { generateCoverLetter } from './flows/generate-cover-letter.flow';
import { AppRpcException } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AiService {
  constructor(@Inject(GEMINI_AI_PROVIDER) private readonly geminiAi: Genkit) {}
  // method for the optimizing of resume
  public async optimizeResume(resume: any) {
    try {
      return await optimizeResumeForATS(this.geminiAi, resume);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new AppRpcException(
        'Failed to optimize resume',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || String(error),
      );
    }
  }
  // method for the creation of coverLetter using genkits
  public async createCoverLetter(coverLetter: any) {
    try {
      return await generateCoverLetter(this.geminiAi, coverLetter);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new AppRpcException(
        'Failed to generate cover letter',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || String(error),
      );
    }
  }
}
