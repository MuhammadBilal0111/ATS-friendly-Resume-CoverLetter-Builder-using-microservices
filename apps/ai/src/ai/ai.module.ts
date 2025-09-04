import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envValidator from './config/env.validation';
import aiConfig from './config/ai.config';
import { genkit } from 'genkit';
import googleAI from '@genkit-ai/googleai';
import { GEMINI_AI_PROVIDER } from '@app/contracts';
import { RmqModule } from '@app/common';
import rabbitMqConfig from 'apps/resume/src/resume/config/rabbitMq.config';

@Module({
  imports: [
    RmqModule, // Import RabbitMQ module to allow communication with other microservices i.e. resume and cover-letter
    ConfigModule.forRoot({
      isGlobal: true,
      load: [aiConfig, rabbitMqConfig], // load the custom ai and rabbitMq configuration
      envFilePath: `${process.cwd()}/apps/ai/.env`,
      validationSchema: envValidator,
    }),
  ],
  providers: [
    AiService,
    {
      provide: GEMINI_AI_PROVIDER,
      useFactory: (configService: ConfigService) => {
        return genkit({
          plugins: [
            googleAI({
              apiKey: configService.get<string>('aiConfig.geminiApiKey'),
            }),
          ],
          model: googleAI.model(
            configService.get<string>('aiConfig.aiModel') as string,
            {
              temperature: 0.8,
            },
          ),
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AiController],
})
export class AiModule {}
