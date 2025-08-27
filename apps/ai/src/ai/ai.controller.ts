import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AiService } from './ai.service';
import { AI_PATTERNS } from '@app/contracts';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @MessagePattern(AI_PATTERNS.OPTIMIZE_RESUME)
  public async optimizeResume(@Payload() resume: any) {
    return this.aiService.optimizeResume(resume);
  }
  
  @MessagePattern(AI_PATTERNS.GENERATE_COVER_LETTER)
  public async createCoverLetter(@Payload() coverLetter: any) {
    return this.aiService.createCoverLetter(coverLetter);
  }
}
