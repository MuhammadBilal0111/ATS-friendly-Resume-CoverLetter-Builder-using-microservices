import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CoverLetterDto, GEMINI_AI_PROVIDER, ResumeDto } from '@app/contracts';
import type { Genkit } from 'genkit';
import { defineOptimizeResumeFlow } from './flows/optimize-resume-for-ats.flow';
import { defineCoverLetterFlow } from './flows/generate-cover-letter.flow';
import { AppRpcException } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AiService {
  private readonly coverLetterFlow: any;
  private readonly optimizeResumeFlow: any;
  constructor(@Inject(GEMINI_AI_PROVIDER) private readonly geminiAi: Genkit) {
    this.coverLetterFlow = defineCoverLetterFlow(this.geminiAi);
    this.optimizeResumeFlow = defineOptimizeResumeFlow(this.geminiAi);
  }
  // method for the optimizing of resume
  public async optimizeResume(resume: ResumeDto) {
    try {
      return await this.optimizeResumeFlow(resume);
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
  public async createCoverLetter(coverLetter: CoverLetterDto) {
    try {
      return await this.coverLetterFlow(coverLetter);
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
