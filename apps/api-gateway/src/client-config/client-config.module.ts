import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidator from '../config/env.validation'; // this should export a Joi schema
import microServiceConfig from '../config/microservices.config';
import { ClientConfigService } from './client-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: `${process.cwd()}/apps/api-gateway/.env`, // Adjust the path as necessary
      validationSchema: envValidator, // should be a Joi object schema
      load: [microServiceConfig],
    }),
  ],
  providers: [ClientConfigService],
  exports: [ClientConfigService], // Export ConfigService if needed in other modules
})
export class ClientConfigModule {} // You were missing this export
