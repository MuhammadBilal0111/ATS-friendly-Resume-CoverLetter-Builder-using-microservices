import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidator from '../config/env.validation'; // this should export a Joi schema
import appConfig from '../config/appConfig';
import microServiceConfig from '../config/microservices.config';
import { ClientConfigService } from './client-config.service';
import { resolve } from 'path';

export const rootEnvPath = resolve(process.cwd(), '.env');

console.log('root', rootEnvPath);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: '.env', // 5 levels up from dist,
      validationSchema: envValidator, // should be a Joi object schema
      load: [appConfig, microServiceConfig],
    }),
  ],
  providers: [ClientConfigService],
  exports: [ClientConfigService], // Export ConfigService if needed in other modules
})
export class ClientConfigModule {} // You were missing this export
