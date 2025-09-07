import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notification/notification.module';
import { RMQ_QUEUES, RmqService, RpcGlobalExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rmqService = app.get<RmqService>(RmqService);

  // Connect Notifications microservice to the notifications queue
  app.connectMicroservice(
    rmqService.getOptions(RMQ_QUEUES.RMQ_QUEUE_NOTIFICATIONS),
  );

  // Apply global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  // Start the microservices
  await app.startAllMicroservices();
  console.log(`Notifications Microservice is listening on:`);
  console.log(`   - ${RMQ_QUEUES.RMQ_QUEUE_NOTIFICATIONS}`);
}

bootstrap();
