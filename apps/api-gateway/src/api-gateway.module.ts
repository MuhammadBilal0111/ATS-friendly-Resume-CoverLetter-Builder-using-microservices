import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResumeModule } from './resume/resume.module';
import { CoverLetterModule } from './cover-letter/cover-letter.module';
import { AUTH_CLIENT } from '@app/contracts';
import { ClientConfigModule } from './client-config/client-config.module';
import { ClientConfigService } from './client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthorizeGuard } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ResumeModule,
    ClientConfigModule,
    CoverLetterModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
    {
      provide: AUTH_CLIENT,
      useFactory: (ClientConfigService: ClientConfigService) => {
        const authClientOptions = ClientConfigService.getAuthClientOptions();
        return ClientProxyFactory.create(authClientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class ApiGatewayModule {}
