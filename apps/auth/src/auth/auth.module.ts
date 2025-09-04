import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import { ConfigModule } from '@nestjs/config';
import { USERS_CLIENT } from '@app/contracts';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  BcryptProvider,
  HashingProvider,
  RMQ_QUEUES,
  RmqModule,
} from '@app/common';
import rabbitMqConfig from './config/rabbitMq.config';
import { validationSchema } from './config/envValidation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, rabbitMqConfig],
      validationSchema: validationSchema,
      envFilePath: `${process.cwd()}/apps/auth/.env`,
    }),
    JwtModule.registerAsync(authConfig.asProvider()), // asProvider() helps to avoid write any extra boilerplate code (that we would have used in order to inject a module using useFactory)

    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false, // we donot need session everything is in the cookie
    }),
    // shared module as the communication takes place from the auth microservice to the users microservice using RMQ
    RmqModule.register({
      clientToken: USERS_CLIENT,
      queue: RMQ_QUEUES.QUEUE_USERS, // auth communicate with users microservice using RMQ
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: HashingProvider, // abstract provider
      useClass: BcryptProvider, // "Whenever you see HashingProvider injected anywhere, give an instance of BcryptProvider."
    },
  ],
  exports: [AuthModule],
})
export class AuthModule {}
