import { NestFactory } from '@nestjs/core';
import { AiAppModule } from './ai-app.module';
import { RMQ_QUEUES, RmqService, RpcGlobalExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AiAppModule);
  const rmqService = app.get<RmqService>(RmqService);

  // Connect AI microservice to both queues
  app.connectMicroservice(
    rmqService.getOptions(RMQ_QUEUES.QUEUE_RESUME_OPTIMIZE),
  );
  app.connectMicroservice(
    rmqService.getOptions(RMQ_QUEUES.QUEUE_COVER_LETTER_CREATE),
  );

  // Apply global exception filter
  app.useGlobalFilters(new RpcGlobalExceptionFilter());

  // Start the microservices
  await app.startAllMicroservices();
  console.log(`AI Microservice is listening on:`);
  console.log(`   - ${RMQ_QUEUES.QUEUE_RESUME_OPTIMIZE}`);
  console.log(`   - ${RMQ_QUEUES.QUEUE_COVER_LETTER_CREATE}`);
}

bootstrap();
