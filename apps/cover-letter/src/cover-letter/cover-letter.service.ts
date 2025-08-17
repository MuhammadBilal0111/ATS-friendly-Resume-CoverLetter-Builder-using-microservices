import { AI_CLIENT, AI_PATTERNS, GenerateCoverLetterDto } from '@app/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CoverLetterService {
  constructor(
    @Inject(AI_CLIENT)
    private readonly aiClient: ClientProxy,
  ) {}

  public async generateCoverLetter(coverLetter: GenerateCoverLetterDto) {
    try {
      return await lastValueFrom(
        this.aiClient.send(AI_PATTERNS.GENERATE_COVER_LETTER, coverLetter),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
