import { Module } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';

// Resume Root Module
@Module({
  imports: [ResumeModule],
  controllers: [],
  providers: [],
})
export class ResumeAppModule {}
