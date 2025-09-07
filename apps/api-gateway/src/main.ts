import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { HttpGlobalExceptionFilter } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ErrorsInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin:
      configService.get<string>('microServiceConfig.corsOrigin') ||
      'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ErrorsInterceptor()); // Global error interceptors
  app.useGlobalFilters(new HttpGlobalExceptionFilter(configService)); // al HTTP exception catch by this filter
  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(
    parseInt(
      configService.get<string>('microServiceConfig.apiGatewayPort') ?? '4000',
      10,
    ),
  );
}
bootstrap();
