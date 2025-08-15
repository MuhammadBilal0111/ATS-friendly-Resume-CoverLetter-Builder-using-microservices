import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT } from '@app/contracts';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BcryptProvider, HashingProvider } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      envFilePath: `${process.cwd()}/apps/auth/.env`,
    }),
    JwtModule.registerAsync(authConfig.asProvider()), // asProvider() helps to avoid write any extra boilerplate code (that we would have used in order to inject a module using useFactory)

    // communicate the auth service with the users service i have to define the communication
    ClientsModule.register([
      {
        name: USERS_CLIENT,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
    ]),
    PassportModule,
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
