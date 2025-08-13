import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { AiAppModule } from './ai-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AiAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3004,
      },
    },
  );
  // defing gloval exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen();
}
bootstrap();
