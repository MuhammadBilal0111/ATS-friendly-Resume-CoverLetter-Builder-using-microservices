import { Controller, Get } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { COVER_LETTER_PATTERNS, GenerateCoverLetterDto } from '@app/contracts';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @MessagePattern(COVER_LETTER_PATTERNS.GENERATE_COVER_LETTER)
  public async generateCoverLetter(
    @Payload() coverLetter: GenerateCoverLetterDto,
  ) {
    return this.coverLetterService.generateCoverLetter(coverLetter);
  }
}
