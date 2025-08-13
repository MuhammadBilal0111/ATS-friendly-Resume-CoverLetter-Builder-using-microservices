import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AUTH_CLIENT } from '@app/contracts';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ClientConfigModule, PassportModule],
  providers: [
    AuthService,
    {
      provide: AUTH_CLIENT, // INJECION TOKEN. // injection token use to established relation with microservice The name property acts as an injection token, which you can use to inject an instance of ClientProxy wherever needed.
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.getAuthClientOptions(); // return client configuration object
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {}
