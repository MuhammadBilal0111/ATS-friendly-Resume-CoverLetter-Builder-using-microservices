import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcGlobalExceptionFilter } from '@app/common';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003,
      },
    },
  );
  // defing global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());
  await app.listen(); // donot use the port in app.listen. PORT is specify in the options object
}
bootstrap();
