import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { AuthorizeGuard } from '@app/common';
import { ROUTES } from '../routes.constants';

@UseGuards(AuthorizeGuard)
@Controller(ROUTES.COVER_LETTER)
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  // POST /cover-letter
  // Create a cover letter with AI
  // Example: http://localhost:3000/cover-letter
  @Post()
  public generateCoverLetter(@Body() coverLetter: GenerateCoverLetterDto) {
    return this.coverLetterService.generateCoverLetter(coverLetter);
  }
}
