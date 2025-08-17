import { Body, Controller, Get } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';

@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  // Get /cover-letter
  // Create a cover-letter with AI
  // Example: http://localhost:3000
  @Get()
  public async generateCoverLetter(
    @Body() coverLetter: GenerateCoverLetterDto,
  ) {
    return this.coverLetterService.generateCoverLetter(coverLetter);
  }
}
