import { Module } from '@nestjs/common';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { RMQ_QUEUES, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { AI_CLIENT } from '@app/contracts';
import rabbitMqConfig from 'apps/resume/src/resume/config/rabbitMq.config';
import coverLetterConfig from './config/cover-letter.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available
      envFilePath: `${process.cwd()}/apps/cover-letter/.env`, // specify the environment file
      load: [rabbitMqConfig, coverLetterConfig], // load the rabbitMq configuration
    }),

    // shared module as the communication takes place from the cover-letter microservice to the Ai microservice using
    RmqModule.register({
      clientToken: AI_CLIENT,
      queue: RMQ_QUEUES.RMQ_QUEUE_COVERLETTER_TO_AI_CREATE,
    }),
  ],
  controllers: [CoverLetterController],
  providers: [CoverLetterService],
})
export class CoverLetterModule {}
