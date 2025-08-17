import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { CoverLetterAppModule } from './cover-letter-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoverLetterAppModule,
    // Second argument is he options object
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3005,
      },
    },
  );

  // defing global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen();
}
bootstrap();
