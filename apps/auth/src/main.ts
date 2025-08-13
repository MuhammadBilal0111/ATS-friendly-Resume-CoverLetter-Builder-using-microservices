import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { AuthAppModule } from './auth-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    // Second argument is he options object
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );

  // defing global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen(); // donot use the port in app.listen. PORT is specify in the options object
}
bootstrap();
