import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { ResumeAppModule } from './resume-app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(ResumeAppModule);
  const configService = appContext.get(ConfigService);

  // --------------------------------------
  // Configurations for Resume Microservice
  // --------------------------------------
  const host = configService.get<string>('resume.resumeServiceHost')!;
  const port = configService.get<number>('resume.resumeServicePort')!;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ResumeAppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  // defining global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  await app.listen(); // donot use the port in app.listen. PORT is specify in the options object
}
bootstrap();
