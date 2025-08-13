import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AiService } from './ai.service';
import { AI_PATTERNS } from '@app/contracts';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @MessagePattern(AI_PATTERNS.OPTIMIZE_RESUME)
  public async optimizeResume(@Payload() resume: any) {
    // TODO: Validate data against OptimizeResumeForATSInputSchema
    console.log('HEllo');
    return this.aiService.optimizeResume(resume);
  }

  @MessagePattern(AI_PATTERNS.GENERATE_COVER_LETTER)
  public async createCoverLetter(@Payload() coverLetter: any) {
    // TODO: Validate data against GenerateCoverLetterInputSchema
    return this.aiService.createCoverLetter(coverLetter);
  }
}
