import { Module } from '@nestjs/common';
import { CoverLetterModule } from './cover-letter/cover-letter.module';

@Module({
  imports: [CoverLetterModule],

})
export class CoverLetterAppModule {}
