import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [],
  providers: [],
})
export class AiAppModule {}
