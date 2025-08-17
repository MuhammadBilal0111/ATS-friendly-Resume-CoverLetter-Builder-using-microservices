import { COVER_LETTER_CLIENT, COVER_LETTER_PATTERNS } from '@app/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';

@Injectable()
export class CoverLetterService {
  constructor(
    @Inject(COVER_LETTER_CLIENT)
    private readonly coverLetterClient: ClientProxy,
  ) {}

  public async generateCoverLetter(coverLetter: GenerateCoverLetterDto) {
    return this.coverLetterClient.send(
      COVER_LETTER_PATTERNS.GENERATE_COVER_LETTER,
      coverLetter,
    );
  }
}
