import { Module } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterController } from './cover-letter.controller';

@Module({
  controllers: [CoverLetterController],
  providers: [CoverLetterService],
})
export class CoverLetterModule {}
