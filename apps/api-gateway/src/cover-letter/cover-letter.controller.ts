import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { AuthorizeGuard } from '@app/common';

// @UseGuards(AuthorizeGuard)
@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  // Post /cover-letter
  // Create a cover-letter with AI
  // Example: http://localhost:3000
  @Post()
  public async generateCoverLetter(
    @Body() coverLetter: GenerateCoverLetterDto,
  ) {
    return this.coverLetterService.generateCoverLetter(coverLetter);
  }
}
