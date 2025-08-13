import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { ResumeAppModule } from './resume-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ResumeAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    },
  );
  // defing global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  await app.listen(); // donot use the port in app.listen. PORT is specify in the options object
}
bootstrap();
