import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { RESUME_CLIENT } from '@app/contracts';
import { ClientConfigService } from '../client-config/client-config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ClientConfigModule, AuthModule],
  providers: [
    ResumeService,
    {
      provide: RESUME_CLIENT, // token for resume
      useFactory: (clientConfigService: ClientConfigService) => {
        const clientOptions = clientConfigService.getResumeClientOptions();
        return ClientProxyFactory.create(clientOptions); // return client configuration object
      },
      inject: [ClientConfigService],
    },
  ],
  controllers: [ResumeController],
})
export class ResumeModule {}
