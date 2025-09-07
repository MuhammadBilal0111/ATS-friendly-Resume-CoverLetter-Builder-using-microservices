import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_QUEUES, RmqService, RpcGlobalExceptionFilter } from '@app/common';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const rmqService = app.get<RmqService>(RmqService);

  // Attach TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3003,
    },
  });
  // Attach RabbitMQ microservice
  app.connectMicroservice<MicroserviceOptions>(
    rmqService.getOptions(RMQ_QUEUES.RMQ_QUEUE_AUTH_TO_USERS),
  );

  // Global exception filter for RPC
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  // Start all microservices (no TCP port needed)
  await app.startAllMicroservices();
  console.log('Users Microservice is running:');
  console.log(`   - RabbitMQ Queue: ${RMQ_QUEUES.RMQ_QUEUE_AUTH_TO_USERS}`);
}
bootstrap();
