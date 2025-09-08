import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notification/notification.module';
import { RMQ_QUEUES, RmqService, RpcGlobalExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rmqService = app.get<RmqService>(RmqService);

  // Connect notification microservice to the notification queue
  app.connectMicroservice(
    rmqService.getOptions(RMQ_QUEUES.RMQ_QUEUE_NOTIFICATION),
  );

  // Apply global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  // Start the microservices
  await app.startAllMicroservices();
  console.log(`notification Microservice is listening on:`);
  console.log(`   - ${RMQ_QUEUES.RMQ_QUEUE_NOTIFICATION}`);
}

bootstrap();
