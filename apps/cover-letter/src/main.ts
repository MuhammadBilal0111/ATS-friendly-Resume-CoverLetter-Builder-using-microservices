import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { CoverLetterAppModule } from './cover-letter-app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the app context first to get access to ConfigService
  const appContext =
    await NestFactory.createApplicationContext(CoverLetterAppModule);
  const configService = appContext.get(ConfigService);

  // --------------------------------------
  // Configurations for CoverLetter Microservice
  // --------------------------------------

  const host = configService.get<string>(
    'cover-letter.coverLetterServiceHost',
  )!;
  const port = configService.get<number>(
    'cover-letter.coverLetterServicePort',
  )!;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoverLetterAppModule,
    // Second argument is he options object
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  // defing global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen();
}
bootstrap();
