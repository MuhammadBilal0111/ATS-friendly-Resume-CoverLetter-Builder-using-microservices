import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AiService } from './ai.service';
import { AI_PATTERNS, CoverLetterDto, ResumeDto } from '@app/contracts';
import { RmqService } from '@app/common';

@Controller()
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(AI_PATTERNS.OPTIMIZE_RESUME)
  public async optimizeResume(
    @Payload() resume: ResumeDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      return await this.aiService.optimizeResume(resume);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw error;
    } finally {
      this.rmqService.ack(context);
    }
  }

  @MessagePattern(AI_PATTERNS.GENERATE_COVER_LETTER)
  public async createCoverLetter(
    @Payload() coverLetter: CoverLetterDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      return await this.aiService.createCoverLetter(coverLetter);
    } catch (error) {
      console.error('Error creating cover letter:', error);
      throw error;
    } finally {
      this.rmqService.ack(context);
    }
  }
}
