import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { AuthAppModule } from './auth-app.module';
import { CoverLetterAppModule } from 'apps/cover-letter/src/cover-letter-app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the app context first to get access to ConfigService
  const appContext =
    await NestFactory.createApplicationContext(CoverLetterAppModule);
  const configService = appContext.get(ConfigService);

  // --------------------------------------
  // Configurations for Auth Microservice
  // --------------------------------------
  const host = configService.get<string>('auth.authServiceHost')!;
  const port = configService.get<number>('auth.authServicePort')!;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
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
  await app.listen(); // donot use the port in app.listen. PORT is specify in the options object
}
bootstrap();
